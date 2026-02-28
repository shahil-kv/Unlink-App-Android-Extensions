const fs = require('fs');
const path = require('path');

const EXTENSIONS_DIR = path.join(process.cwd(), 'extensions');
const DIST_DIR = path.join(process.cwd(), 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'marketplace.json');

/**
 * Registry Builder
 * Scans 'extensions/' folder, validates manifests, and merges into one file.
 */
function buildRegistry() {
  console.log('🏗️  Building Marketplace Registry...');
  
  const extensions = [];
  if (!fs.existsSync(EXTENSIONS_DIR)) {
    console.error('❌  extensions/ folder not found.');
    process.exit(1);
  }

  // Create dist if not exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  const folders = fs.readdirSync(EXTENSIONS_DIR);

  for (const folder of folders) {
    const extensionPath = path.join(EXTENSIONS_DIR, folder);
    if (!fs.statSync(extensionPath).isDirectory()) continue;

    const manifestPath = path.join(extensionPath, 'extension.json');
    
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        
        // Basic Validation
        if (!manifest.id || !manifest.title) {
          console.warn(`⚠️  Skipping ${folder}: Missing id or title.`);
          continue;
        }

        extensions.push({
          ...manifest,
          bundlePath: `bundles/${folder}.bundle.js`, 
          lastUpdated: new Date().toISOString(),
          folder: folder
        });
        
        console.log(`✅ Included: ${manifest.title}`);
      } catch (err) {
        console.error(`❌ Error parsing manifest for ${folder}:`, err.message);
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(extensions, null, 2));
  console.log(`\n🎉 Registry created with ${extensions.length} extensions at ${OUTPUT_FILE}`);
}

buildRegistry();
