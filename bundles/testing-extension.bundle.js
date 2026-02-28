var Extension_testing_extension = (() => {
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

  // global-react:react
  var require_react = __commonJS({
    "global-react:react"(exports, module) {
      module.exports = globalThis.React;
    }
  });

  // global-rn:react-native
  var require_react_native = __commonJS({
    "global-rn:react-native"(exports, module) {
      module.exports = globalThis.ReactNative;
    }
  });

  // extensions/testing-extension/testing-extension.tsx
  var testing_extension_exports = {};
  __export(testing_extension_exports, {
    TestingExtension: () => TestingExtension
  });
  var import_react = __toESM(require_react());
  var import_react_native = __toESM(require_react_native());
  var TestingExtension = () => {
    return /* @__PURE__ */ import_react.default.createElement(import_react_native.View, { className: "p-4 bg-zinc-900 rounded-2xl" }, /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, { className: "text-white" }, "Hello from testing-extension!"));
  };
  return __toCommonJS(testing_extension_exports);
})();
