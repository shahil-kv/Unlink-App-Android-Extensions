#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const qrcode = require('qrcode-terminal');
const boxen = require('boxen');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { WebSocketServer } = require('ws');
const chokidar = require('chokidar');

const program = new Command();

program
  .name('unlink')
  .description('CLI to develop and manage Unlink extensions')
  .version('1.1.0');

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

program
  .command('dev')
  .description('Start a live development server for an extension')
  .argument('<name>', 'extension folder name')
  .action((name) => {
    const extensionPath = path.join(process.cwd(), 'extensions', name);
    const port = 8081;
    const wsPort = 8082;

    if (!fs.existsSync(extensionPath)) {
      console.error(chalk.red(`❌  Extension "${name}" not found in extensions/ folder.`));
      process.exit(1);
    }

    const localIp = getLocalIp();
    const devUrl = `http://${localIp}:${port}`;
    const wsUrl = `ws://${localIp}:${wsPort}`;

    // 1. HTTP Server for Manifest & Bundles
    const server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      if (req.method === 'OPTIONS') { res.statusCode = 204; res.end(); return; }

      const filePath = path.join(extensionPath, req.url === '/' ? 'extension.json' : req.url);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath);
        res.setHeader('Content-Type', filePath.endsWith('.json') ? 'application/json' : 'text/javascript');
        res.end(content);
        console.log(chalk.gray(`📡  Served: ${req.url}`));
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }
    });

    server.listen(port, '0.0.0.0');

    // 2. WebSocket Server for Live Reload
    const wss = new WebSocketServer({ port: wsPort });
    console.log(chalk.dim(`🔌  Live Reload Server on ${wsUrl}`));

    // 3. File Watcher
    const watcher = chokidar.watch(extensionPath, { ignoreInitial: true });
    watcher.on('all', (event, path) => {
      console.log(chalk.yellow(`\n📝  File changed: ${path.split('/').pop()}`));
      console.log(chalk.cyan(`🔄  Triggering Live Reload...`));
      
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ type: 'reload' }));
        }
      });
    });

    // 4. Console UI
    console.clear();
    console.log(boxen(chalk.bold.magenta('Unlink Extension Dev Server v1.1'), { padding: 1, borderColor: 'magenta', borderStyle: 'round' }));
    console.log(`\n🚀  Serving extension: ${chalk.bold.yellow(name)}`);
    console.log(`📱  Scan the code below in the ${chalk.bold('Unlink App')}:\n`);

    qrcode.generate(devUrl, { small: true });

    console.log(`\n🔗  URL: ${chalk.cyan(devUrl)}`);
    console.log(`⚡  Live Reload: ${chalk.green('Active')}`);
    console.log(chalk.dim('\nWatching for changes... (Press Ctrl+C to stop)\n'));
  });

program
  .command('init')
  .description('Scaffold a new extension')
  .argument('<name>', 'new extension name')
  .action((name) => {
    const targetPath = path.join(process.cwd(), 'extensions', name);
    if (fs.existsSync(targetPath)) {
      console.error(chalk.red(`❌  Folder "${name}" already exists.`));
      process.exit(1);
    }

    fs.mkdirSync(targetPath, { recursive: true });
    
    const manifest = {
      id: name,
      title: name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
      author: 'your-github-username',
      description: 'A cool new extension for Unlink',
      category: 'Utilities',
      icon: 'star',
      iconType: 'Ionicons',
      color: '#ff006e',
      pro: false,
      version: '1.0.0'
    };

    fs.writeFileSync(path.join(targetPath, 'extension.json'), JSON.stringify(manifest, null, 2));
    fs.writeFileSync(path.join(targetPath, `${name.replace(/-/g, '')}.tsx`), `import React from 'react';
import { View, Text } from 'react-native';
import { ScreenBreak } from '../../sdk';

export const ${name.replace(/-/g, '').charAt(0).toUpperCase() + name.replace(/-/g, '').slice(1)} = () => {
  return (
    <View className="p-4 bg-zinc-900 rounded-2xl">
      <Text className="text-white">Hello from ${name}!</Text>
    </View>
  );
};
`);

    console.log(chalk.green(`\n✅  Extension "${name}" created successfully!`));
    console.log(`\nNext steps:`);
    console.log(chalk.cyan(`  1. Open extensions/${name}/extension.json to edit metadata.`));
    console.log(chalk.cyan(`  2. Run 'npm run dev ${name}' to test on your phone.\n`));
  });

program.parse(process.argv);
