// This shim allows extensions to access the ScreenBreak SDK 
// provided by the host mobile app without bundling the whole implementation.
// We use globalThis for universal compatibility across JS engines (Hermes, JSC, etc.)
module.exports = globalThis.ScreenBreak || global.ScreenBreak;
