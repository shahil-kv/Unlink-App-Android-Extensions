const fs = require('fs');
const path = require('path');

const EXTENSIONS_DIR = path.join(__dirname, '../extensions');
const OUTPUT_FILE = path.join(__dirname, '../marketplace.json');

/**
 * Registry Builder
 * Scans 'extensions/' folder, validates manifests, and merges into one file.
 */
function buildRegistry() {
  console.log('🏗️  Building Marketplace Registry...');
  
  const extensions = [];
  const folders = fs.readdirSync(EXTENSIONS_DIR);

  for (const folder of folders) {
    const manifestPath = path.join(EXTENSIONS_DIR, folder, 'extension.json');
    
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
          bundlePath: `bundles/${folder}.js`, // Mock path for now
          lastUpdated: new Date().toISOString()
        });
        
        console.log(`✅ Included: ${manifest.title}`);
      } catch (err) {
        console.error(`❌ Error parsing manifest for ${folder}:`, err.message);
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(extensions, null, 2));
  console.log(`\n🎉 Registry created with ${extensions.length} extensions.`);
}

buildRegistry();
