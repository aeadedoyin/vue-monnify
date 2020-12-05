'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
//
//
//
//
//
//
//
var script = {
  name: "VueMonnify",
  // vue component name
  props: {
    reference: {
      type: String,
      required: true
    },
    contractCode: {
      type: String,
      default: ""
    },
    apiKey: {
      type: String,
      required: true
    },
    customerEmail: {
      type: String,
      required: true
    },
    customerName: {
      type: String,
      default: ""
    },
    customerMobileNumber: {
      type: String,
      default: ""
    },
    amount: {
      type: Number,
      required: true
    },
    isTestMode: {
      type: Boolean,
      required: true,
      default: true
    },
    onComplete: {
      type: Function,
      required: true,
      default: function _default(response) {}
    },
    onClose: {
      type: Function,
      required: true,
      default: function _default(data) {}
    },
    metadata: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    currency: {
      type: String,
      default: "NGN"
    },
    paymentDescription: {
      type: String,
      default: ""
    },
    paymentMethods: {
      type: Array,
      default: function _default() {
        return ["ACCOUNT_TRANSFER"];
      }
    },
    btnClass: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      scriptLoaded: null
    };
  },
  created: function created() {
    var _this = this;

    this.scriptLoaded = new Promise(function (resolve) {
      _this.loadScript(function () {
        resolve();
      });
    });
  },
  methods: {
    loadScript: function loadScript(callback) {
      var script = document.createElement("script");
      script.src = "https://sdk.monnify.com/plugin/monnify.js";
      document.getElementsByTagName("head")[0].appendChild(script);

      if (script.readyState) {
        // IE
        script.onreadystatechange = function () {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        // Others
        script.onload = function () {
          callback();
        };
      }
    },
    payWithMonnify: function payWithMonnify() {
      var _this2 = this;

      this.scriptLoaded && this.scriptLoaded.then(function () {
        var monnifyOptions = {
          amount: _this2.amount,
          currency: _this2.currency,
          reference: _this2.reference,
          customerName: _this2.customerName,
          customerEmail: _this2.customerEmail,
          customerMobileNumber: _this2.customerMobileNumber,
          apiKey: _this2.apiKey,
          contractCode: _this2.contractCode,
          paymentDescription: _this2.paymentDescription,
          isTestMode: _this2.isTestMode,
          onComplete: function onComplete(response) {
            _this2.onComplete(response);
          },
          onClose: function onClose(data) {
            _this2.onClose(data);
          },
          metadata: _this2.metadata,
          paymentMethods: _this2.paymentMethods
        };
        window.MonnifySDK.initialize(monnifyOptions);
      });
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<button" + _vm._ssrClass(null, _vm.btnClass) + ">", "</button>", [_vm._t("default", [_vm._v("Make Payment")])], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-7270a77e";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);// Import vue component

var install = function installVueMonnify(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueMonnify', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;