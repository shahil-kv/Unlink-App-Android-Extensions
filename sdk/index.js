// This shim allows extensions to access the ScreenBreak SDK 
// provided by the host mobile app without bundling the whole implementation.
// We use globalThis for universal compatibility across JS engines (Hermes, JSC, etc.)
const universalGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
export const ScreenBreak = universalGlobal.ScreenBreak;
