var Extension_greyscale_fader = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // sdk/index.js
  var require_sdk = __commonJS({
    "sdk/index.js"(exports, module) {
      var universalGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
      module.exports = universalGlobal.ScreenBreak;
    }
  });

  // extensions/greyscale-fader/GreyscaleFader.tsx
  var GreyscaleFader_exports = {};
  __export(GreyscaleFader_exports, {
    GreyscaleFader: () => GreyscaleFader
  });

  // global-react:react
  var R = globalThis.React;
  var useState = R.useState;
  var useEffect = R.useEffect;
  var useMemo = R.useMemo;
  var useCallback = R.useCallback;
  var useRef = R.useRef;
  var react_default = R;

  // global-rn:react-native
  var RN = globalThis.ReactNative;
  var View = RN.View;
  var Text = RN.Text;
  var StyleSheet = RN.StyleSheet;
  var TouchableOpacity = RN.TouchableOpacity;
  var TouchableWithoutFeedback = RN.TouchableWithoutFeedback;
  var ScrollView = RN.ScrollView;
  var Switch = RN.Switch;
  var Alert = RN.Alert;
  var Image = RN.Image;
  var ActivityIndicator = RN.ActivityIndicator;

  // extensions/greyscale-fader/GreyscaleFader.tsx
  var import_sdk = __toESM(require_sdk());
  var GreyscaleFader = () => {
    const [enabled, setEnabled] = react_default.useState(false);
    const toggleGreyscale = (value) => __async(void 0, null, function* () {
      setEnabled(value);
      yield import_sdk.ScreenBreak.visuals.setGrayscale(value ? 1 : 0);
    });
    return /* @__PURE__ */ react_default.createElement(View, { className: "p-4 bg-gray-900/50 rounded-2xl border border-gray-800" }, /* @__PURE__ */ react_default.createElement(View, { className: "flex-row justify-between items-center mb-2" }, /* @__PURE__ */ react_default.createElement(View, { className: "flex-1" }, /* @__PURE__ */ react_default.createElement(Text, { className: "text-white font-bold text-lg" }, "Greyscale Fader"), /* @__PURE__ */ react_default.createElement(Text, { className: "text-gray-400 text-xs mt-1" }, "Manually force your screen into Black & White mode to reduce dopamine.")), /* @__PURE__ */ react_default.createElement(
      Switch,
      {
        value: enabled,
        onValueChange: toggleGreyscale,
        trackColor: { false: "#3a3a3c", true: "#ffffff" },
        thumbColor: enabled ? "#000000" : "#f4f3f4"
      }
    )), /* @__PURE__ */ react_default.createElement(View, { className: "mt-2 flex-row items-center" }, /* @__PURE__ */ react_default.createElement(View, { className: `w-2 h-2 rounded-full mr-2 ${enabled ? "bg-green-500" : "bg-gray-600"}` }), /* @__PURE__ */ react_default.createElement(Text, { className: "text-gray-500 text-[10px] uppercase font-bold tracking-widest" }, enabled ? "Active" : "Inactive")));
  };
  return __toCommonJS(GreyscaleFader_exports);
})();
