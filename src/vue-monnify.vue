<template>
  <div>
    <button :class="btnClass" @click="payWithMonnify">
      <slot>Make Payment</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "VueMonnify", // vue component name
  props: {
    reference: {
      type: String,
      required: true,
    },
    contractCode: {
      type: String,
      default: "",
    },
    apiKey: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      default: "",
    },
    customerMobileNumber: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
    },
    isTestMode: {
      type: Boolean,
      required: true,
      default: true,
    },
    onComplete: {
      type: Function,
      required: true,
      default(response) {},
    },
    onClose: {
      type: Function,
      required: true,
      default(data) {},
    },
    metadata: {
      type: Object,
      default() {
        return {};
      },
    },
    currency: {
      type: String,
      default: "NGN",
    },
    paymentDescription: {
      type: String,
      default: "",
    },
    paymentMethods: {
      type: Array,
      default() {
        return ["ACCOUNT_TRANSFER"];
      },
    },
    btnClass: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      scriptLoaded: null,
    };
  },

  created() {
    this.scriptLoaded = new Promise((resolve) => {
      this.loadScript(() => {
        resolve();
      });
    });
  },

  methods: {
    loadScript(callback) {
      const script = document.createElement("script");
      script.src = "https://sdk.monnify.com/plugin/monnify.js";
      document.getElementsByTagName("head")[0].appendChild(script);
      if (script.readyState) {
        // IE
        script.onreadystatechange = () => {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        // Others
        script.onload = () => {
          callback();
        };
      }
    },

    payWithMonnify() {
      this.scriptLoaded &&
        this.scriptLoaded.then(() => {
          const monnifyOptions = {
            amount: this.amount,
            currency: this.currency,
            reference: this.reference,
            customerName: this.customerName,
            customerEmail: this.customerEmail,
            customerMobileNumber: this.customerMobileNumber,
            apiKey: this.apiKey,
            contractCode: this.contractCode,
            paymentDescription: this.paymentDescription,
            isTestMode: this.isTestMode,
            onComplete: (response) => {
              this.onComplete(response);
            },
            onClose: (data) => {
              this.onClose(data);
            },
            metadata: this.metadata,
            paymentMethods: this.paymentMethods,
          };

          window.MonnifySDK.initialize(monnifyOptions);
        });
    },
  },
};
</script>