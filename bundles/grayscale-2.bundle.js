var Extension_intelligent_focus = (() => {
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

  // extensions/grayscale-2/Grayscale2.tsx
  var Grayscale2_exports = {};
  __export(Grayscale2_exports, {
    IntelligentFocusMode: () => IntelligentFocusMode
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

  // extensions/grayscale-2/Grayscale2.tsx
  var import_sdk = __toESM(require_sdk());
  var IntelligentFocusMode = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [wasManuallyDisabled, setWasManuallyDisabled] = useState(false);
    const toggleFocusMode = (value) => __async(void 0, null, function* () {
      if (value && !hasPermission) {
        Alert.alert(
          "Display Permissions",
          "This extension requires permissioss to modify screen saturation through the ScreenBreak Accessibility Service.",
          [
            { text: "Cancel", style: "cancel", onPress: () => setIsEnabled(false) },
            {
              text: "Enable",
              onPress: () => __async(void 0, null, function* () {
                setHasPermission(true);
                setIsEnabled(true);
                setWasManuallyDisabled(false);
                yield import_sdk.ScreenBreak.visuals.setGrayscale(1);
              })
            }
          ]
        );
      } else {
        setIsEnabled(value);
        if (!value)
          setWasManuallyDisabled(true);
        else
          setWasManuallyDisabled(false);
        yield import_sdk.ScreenBreak.visuals.setGrayscale(value ? 1 : 0);
      }
    });
    useEffect(() => {
      const unsubscribe = import_sdk.ScreenBreak.onUpdate((stats) => __async(void 0, null, function* () {
        if (stats.todayTotalMinutes >= 120 && !isEnabled && hasPermission && !wasManuallyDisabled) {
          setIsEnabled(true);
          yield import_sdk.ScreenBreak.visuals.setGrayscale(1);
          Alert.alert("Daily Limit Reached", "Intelligent Focus has been enabled to help you stay focused.");
        }
      }));
      return () => unsubscribe();
    }, [isEnabled, hasPermission, wasManuallyDisabled]);
    return /* @__PURE__ */ react_default.createElement(View, { className: "p-5 bg-zinc-900 rounded-3xl border border-zinc-800" }, /* @__PURE__ */ react_default.createElement(View, { className: "flex-row justify-between items-start mb-4" }, /* @__PURE__ */ react_default.createElement(View, { className: "flex-1" }, /* @__PURE__ */ react_default.createElement(View, { className: "flex-row items-center mb-1" }, /* @__PURE__ */ react_default.createElement(Text, { className: "text-white font-bold text-xl tracking-tight" }, "Intelligent Focus"), /* @__PURE__ */ react_default.createElement(View, { className: "ml-2 px-2 py-0.5 bg-zinc-800 rounded-md border border-zinc-700" }, /* @__PURE__ */ react_default.createElement(Text, { className: "text-[10px] text-zinc-400 font-bold uppercase" }, "PRO"))), /* @__PURE__ */ react_default.createElement(Text, { className: "text-zinc-500 text-sm" }, "Automatically activates grayscale mode after 120 minutes of daily usage.")), /* @__PURE__ */ react_default.createElement(
      Switch,
      {
        value: isEnabled,
        onValueChange: toggleFocusMode,
        trackColor: { false: "#27272a", true: "#ffffff" },
        thumbColor: isEnabled ? "#000000" : "#71717a"
      }
    )), /* @__PURE__ */ react_default.createElement(View, { className: "flex-row items-center justify-between border-t border-zinc-800 pt-3" }, /* @__PURE__ */ react_default.createElement(View, { className: "flex-row items-center" }, /* @__PURE__ */ react_default.createElement(View, { className: `w-2 h-2 rounded-full mr-2 ${isEnabled ? "bg-white" : "bg-zinc-700"}` }), /* @__PURE__ */ react_default.createElement(Text, { className: "text-zinc-600 text-[10px] uppercase font-bold tracking-widest" }, isEnabled ? "Filter Active" : "Monitoring Usage")), hasPermission && /* @__PURE__ */ react_default.createElement(Text, { className: "text-zinc-500 text-[10px]" }, "Permission Active")));
  };
  return __toCommonJS(Grayscale2_exports);
})();
