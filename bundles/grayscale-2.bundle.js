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
    return /* @__PURE__ */ react_default.createElement(View, { className: "pt-2" }, /* @__PURE__ */ react_default.createElement(View, { className: "flex-row justify-between items-center mb-6 pl-1" }, /* @__PURE__ */ react_default.createElement(View, { className: "flex-1 pr-6" }, /* @__PURE__ */ react_default.createElement(Text, { className: "text-gray-300 text-sm leading-5" }, "Automatically applies the grayscale wash-out focus filter after you hit 120 minutes of daily ScreenBreak usage.")), /* @__PURE__ */ react_default.createElement(
      Switch,
      {
        value: isEnabled,
        onValueChange: toggleFocusMode,
        trackColor: { false: "#27272a", true: "#ff006e" },
        thumbColor: isEnabled ? "#ffffff" : "#a1a1aa"
      }
    )), /* @__PURE__ */ react_default.createElement(View, { className: "flex-row items-center justify-between border-t border-gray-800/60 pt-4 pb-2" }, /* @__PURE__ */ react_default.createElement(View, { className: "flex-row items-center" }, /* @__PURE__ */ react_default.createElement(View, { className: `w-2 h-2 rounded-full mr-2.5 shadow-sm ${isEnabled ? "bg-[#ff006e] shadow-[#ff006e]" : "bg-gray-600"}` }), /* @__PURE__ */ react_default.createElement(Text, { className: `text-xs uppercase font-bold tracking-widest ${isEnabled ? "text-[#ff006e]" : "text-gray-500"}` }, isEnabled ? "Filter Active" : "Monitoring Usage")), hasPermission && /* @__PURE__ */ react_default.createElement(Text, { className: "text-gray-600 text-[10px] uppercase font-bold tracking-wider" }, "Access Granted")));
  };
  return __toCommonJS(Grayscale2_exports);
})();
