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
    
    // We MUST use the ID from manifest, as that's what the app uses to look up the component
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
        // Standardize: Extension_[id_with_underscores]
        globalName: `Extension_${extensionId.replace(/-/g, '_')}`,
        minify: true,
        target: ['es2015'], 
        external: ['react', 'react-native'], 
        loader: {
          '.tsx': 'tsx',
          '.ts': 'ts',
        },
      });
      console.log(`✅ Bundled: ${manifest.title} -> ${folder}.bundle.js (as Extension_${extensionId.replace(/-/g, '_')})`);
    } catch (err) {
      console.error(`❌ Failed to bundle ${folder}:`, err);
    }
  }
}

bundleExtensions();
