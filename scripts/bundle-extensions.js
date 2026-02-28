const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const EXTENSIONS_DIR = path.join(process.cwd(), 'extensions');
const DIST_DIR = path.join(process.cwd(), 'dist/bundles');

async function bundleExtensions() {
  console.log('📦 Bundling extensions for Remote Delivery...');

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
        globalName: `Extension_${folder.replace(/-/g, '_')}`,
        minify: true,
        // Using es2015 to ensure async/await are transpiled to generators/promises.
        // This fixes compatibility issues with 'new Function' in some React Native environments.
        target: ['es2015'], 
        external: ['react', 'react-native'], 
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
