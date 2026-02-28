# 🚀 Unlink App: Android Extensions

Welcome to the official extensions repository for **Unlink** (Screen Break). Build powerful, focus-enhancing features that help thousands of users reclaim their time.

This repository allows you to develop, test, and contribute custom UI and logic that runs directly inside the Unlink Android application.

## 🛠️ The Developer Experience

We provide a **Zero-Friction** workflow. Use our CLI to scaffold new extensions and test them on your device in real-time with instant live-reload.

### 1. Prerequisites
- Node.js (v18+)
- [Unlink App](https://play.google.com/store/apps/details?id=com.unlink.app) installed on your Android device.

### 2. Setup
Clone this repository and install dependencies:
```bash
git clone https://github.com/shahil-kv/Unlink-App-Android-Extensions.git
cd Unlink-App-Android-Extensions
npm install
```

### 3. Create a New Extension
Use the Unlink CLI to scaffold a new extension:
```bash
npm run init <extension-name>
```
This will create a new folder in `extensions/` with the required manifest and a starter React Native component.

### 4. Local Development & Testing
To test your extension live in the Unlink app:
1. Start the development server:
   ```bash
   npm run dev <extension-name>
   ```
2. A **QR Code** will appear in your terminal.
3. Open the **Unlink App** on your phone.
4. Navigate to the **Extensions** screen.
5. **Developer Mode**: Triple-tap the "Marketplace" title to reveal the **Developer Tools**.
6. Tap **"Scan QR"** and scan the code from your terminal.
7. Tap **"Load"** to see your extension live!

### ⚡ Live Reload
When the dev server is running, any changes you save to your code (e.g., `Grayscale.tsx`) will trigger an **instant refresh** on your phone. No need to re-scan.

---

## 🏗️ Technical Stack
- **Framework**: React Native (via Re.Pack/Module Federation).
- **Styling**: Tailwind CSS (NativeWind).
- **Language**: TypeScript.
- **SDK**: Use the `@screenbreak/sdk` to access focus-mode features (Grayscale, Statistics, etc.).

## 🤝 Contributing
Once your extension is ready:
1. Ensure your `extension.json` manifest is complete (title, author, icon).
2. Open a **Pull Request** to this repository.
3. Our team will review the code for performance and security.
4. Once approved, your extension will be built and published to the global Unlink Marketplace instantly.

---

## 📜 License
MIT © [Unlink Team](https://unlink.app)
