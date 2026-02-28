var Extension_intelligent_focus = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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

  // global-sdk:../../sdk
  var universalGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
  var ScreenBreak = universalGlobal.ScreenBreak;

  // extensions/grayscale-2/Grayscale2.tsx
  var IntelligentFocusMode = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [wasManuallyDisabled, setWasManuallyDisabled] = useState(false);
    const toggleFocusMode = (value) => __async(void 0, null, function* () {
      const isActuallyEnabled = yield ScreenBreak.visuals.hasAccessibilityPermission();
      if (value && !isActuallyEnabled) {
        setHasPermission(false);
        Alert.alert(
          "Accessibility Permission Required",
          "To filter all apps, ScreenBreak needs Accessibility permission. We only use this to draw a gray filter over your screen without tracking what you type.",
          [
            { text: "Cancel", style: "cancel", onPress: () => setIsEnabled(false) },
            {
              text: "Open Settings",
              onPress: () => __async(void 0, null, function* () {
                setIsEnabled(true);
                setWasManuallyDisabled(false);
                yield ScreenBreak.visuals.openAccessibilitySettings();
                setHasPermission(true);
                yield ScreenBreak.visuals.setGrayscale(1);
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
        yield ScreenBreak.visuals.setGrayscale(value ? 1 : 0);
      }
    });
    useEffect(() => {
      const unsubscribe = ScreenBreak.onUpdate((stats) => __async(void 0, null, function* () {
        if (stats.todayTotalMinutes >= 120 && !isEnabled && hasPermission && !wasManuallyDisabled) {
          setIsEnabled(true);
          yield ScreenBreak.visuals.setGrayscale(1);
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
