var Extension_testing_extension = (() => {
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

  // extensions/testing-extension/testing-extension.tsx
  var testing_extension_exports = {};
  __export(testing_extension_exports, {
    TestingExtension: () => TestingExtension
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

  // extensions/testing-extension/testing-extension.tsx
  var TestingExtension = () => {
    return /* @__PURE__ */ react_default.createElement(View, { className: "p-4 bg-transparent border-t border-gray-800/60 mt-2" }, /* @__PURE__ */ react_default.createElement(Text, { className: "text-gray-300 font-medium" }, "Hello there! The developer testing extension has been successfully loaded over the air."), /* @__PURE__ */ react_default.createElement(View, { className: "mt-4 flex-row items-center" }, /* @__PURE__ */ react_default.createElement(View, { className: "w-2 h-2 rounded-full mr-2.5 shadow-sm bg-[#ff006e] shadow-[#ff006e]" }), /* @__PURE__ */ react_default.createElement(Text, { className: "text-[#ff006e] text-[10px] uppercase font-bold tracking-widest" }, "Active Bundle Connection")));
  };
  return __toCommonJS(testing_extension_exports);
})();
