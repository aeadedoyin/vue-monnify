<script>
import Vue from "vue";
import VueMonnify from "@/vue-monnify.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VueMonnify,
  },
  data() {
    return {
      // monnifyAPIKey: process.env.MONNIFYAPIKEY, // This has both test and product values
      // monnifyContractCode: process.env.MONNIFYCONTRACTCODE, // This has both test and product values
      // monnifyIsTest: process.env.MONNIFYISTEST, // This should be true in test/dev environment and false in production
      // payMetadata: {}, // This can be populated with key/values as you wish
      // email: "customer@domain.com", // Customer email
      // amount: 10000, // of type:Number and in naira
    };
  },

  computed: {
    payRef() {
      let _ref = "";
      const alphanumeric =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        _ref += alphanumeric.charAt(
          Math.floor(Math.random() * alphanumeric.length)
        );

      return _ref;
    },
  },

  methods: {
    monnifyComplete: function (response) {
      // Perform other operations upon complete
      console.log("Monnify Payment Complete", response);
    },
    monnifyClose: function (data) {
      // Perform other operations upon close
      console.log("Monnify Payment closed", data);
    },
  },
});
</script>

<template>
  <div id="app">
    <vue-monnify
      ref="vueMonnifyButton"
      :amount="amount"
      :api-key="monnifyAPIKey"
      :contract-code="monnifyContractCode"
      :customer-email="email"
      :is-test-mode="monnifyIsTest"
      :metadata="payMetadata"
      :on-close="monnifyClose"
      :on-complete="monnifyComplete"
      :reference="payRef"
    />
  </div>
</template>
