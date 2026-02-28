const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const EXTENSIONS_DIR = path.join(process.cwd(), 'extensions');
const DIST_DIR = path.join(process.cwd(), 'dist/bundles');

// This plugin replaces 'react' and 'react-native' with direct global references
// This bypasses the 'require' and '__toESM' overhead which causes the useState bugs.
const globalPlugin = {
  name: 'global-plugin',
  setup(build) {
    build.onResolve({ filter: /^react$/ }, args => ({ path: args.path, namespace: 'global-react' }));
    build.onResolve({ filter: /^react-native$/ }, args => ({ path: args.path, namespace: 'global-rn' }));
    
    build.onLoad({ filter: /.*/, namespace: 'global-react' }, () => ({
      contents: `
        // Explicitly exporting ESM bypasses esbuild's CommonJS __toESM wrapper,
        // which contains the __copyProps loop that triggers a known Hermes scope capture bug.
        const R = globalThis.React;
        export const useState = R.useState;
        export const useEffect = R.useEffect;
        export const useMemo = R.useMemo;
        export const useCallback = R.useCallback;
        export const useRef = R.useRef;
        export default R;
      `,
      loader: 'js'
    }));
    build.onLoad({ filter: /.*/, namespace: 'global-rn' }, () => ({
      contents: `
        const RN = globalThis.ReactNative;
        export const View = RN.View;
        export const Text = RN.Text;
        export const StyleSheet = RN.StyleSheet;
        export const TouchableOpacity = RN.TouchableOpacity;
        export const TouchableWithoutFeedback = RN.TouchableWithoutFeedback;
        export const ScrollView = RN.ScrollView;
        export const Switch = RN.Switch;
        export const Alert = RN.Alert;
        export const Image = RN.Image;
        export const ActivityIndicator = RN.ActivityIndicator;
        export default RN;
      `,
      loader: 'js'
    }));
  },
};

async function bundleExtensions() {
  console.log('📦 Bundling extensions for Remote Delivery (Global Mode)...');

  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  const folders = fs.readdirSync(EXTENSIONS_DIR);

  for (const folder of folders) {
    const extensionPath = path.join(EXTENSIONS_DIR, folder);
    if (!fs.statSync(extensionPath).isDirectory()) continue;

    const manifestPath = path.join(extensionPath, 'extension.json');
    if (!fs.existsSync(manifestPath)) continue;

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    const extensionId = manifest.id;
    if (!extensionId) {
      console.warn(`⚠️ Skipping ${folder}: Missing 'id' in extension.json`);
      continue;
    }

    const entryFile = fs.readdirSync(extensionPath).find(f => f.endsWith('.tsx') || f.endsWith('.ts'));

    if (!entryFile) {
      console.warn(`⚠️ Skipping ${folder}: No entry file found.`);
      continue;
    }

    const entryPoint = path.join(extensionPath, entryFile);
    const outfile = path.join(DIST_DIR, `${folder}.bundle.js`);

    try {
      await esbuild.build({
        entryPoints: [entryPoint],
        bundle: true,
        outfile: outfile,
        format: 'iife',
        globalName: `Extension_${extensionId.replace(/-/g, '_')}`,
        minify: false, 
        target: ['es2015'], 
        plugins: [globalPlugin],
        loader: {
          '.tsx': 'tsx',
          '.ts': 'ts',
        },
      });
      console.log(`✅ Bundled: ${manifest.title} -> ${folder}.bundle.js`);
    } catch (err) {
      console.error(`❌ Failed to bundle ${folder}:`, err);
    }
  }
}

bundleExtensions();
