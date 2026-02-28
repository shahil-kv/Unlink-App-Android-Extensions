## 🛠️ Step 1: Define your Manifest ([extension.json](file:///Users/shahil/Documents/Coding/Personal/Startup/Screen%20Break%20App/extensions/greyscale-fader/extension.json))
Every extension MUST have an [extension.json](file:///Users/shahil/Documents/Coding/Personal/Startup/Screen%20Break%20App/extensions/greyscale-fader/extension.json) file in its root. This is how the Screen Break marketplace knows what to show.
```json
{
  "id": "my-cool-extension",
  "title": "My Cool Extension",
  "author": "your-github-handle",
  "description": "Short summary of what it does.",
  "category": "Challenges",
  "icon": "fire",
  "iconType": "Ionicons",
  "color": "#ff006e",
  "pro": false,
  "version": "1.0.0"
}
💻 Step 2: Use the SDK
Your main component should be exported and use the global 
ScreenBreak
 SDK.

tsx
import { ScreenBreak } from '../../core/sdk';
export const MyExtension = () => {
  const handleAction = async () => {
    // Turn screen grey
    await ScreenBreak.visuals.setGrayscale(1.0);
    // Show a message
    console.log("Stats:", ScreenBreak.stats.todayTotalMinutes);
  };
  
  return (
    <TouchableOpacity onPress={handleAction}>
      <Text>Trigger Action</Text>
    </TouchableOpacity>
  );
};
🤖 Step 3: The Publishing Pipeline
In our main repository, we have a GitHub Action that runs every time a PR is merged:

Scan: It runs node scripts/build-marketplace.js to find your new extension.
Bundle: It uses Re.Pack (Webpack) to compile your code into a single "Remote Module."
Register: Your extension is added to the marketplace.json globally.
Live: Within minutes, users will see your extension in their "Marketplace" screen!
🌟 Win-Win Monetization
Free Extensions: Build for the community!