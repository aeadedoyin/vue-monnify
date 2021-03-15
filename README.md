<p align="center"><img src="vue-monnify.png?raw=true" width="70%"></p>

<br />

# Vue Component for Monnify

A Vue Plugin (Pay Button 💰) for Monnify payment gateway.  
It wraps the official [Monnify Web SDK](https://docs.teamapt.com/display/MON/Monnify+Web+SDK);  
Making it pretty straightforward to add Monnify Pay Button to your vue-based application.  
Available for Vue 2 & 3

## Installation

### NPM
```bash
npm install vue-monnify --save 
``` 

### Javascript via CDN
```javascript 1.8
<!-- Vue -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- Vue-Monnify -->
<script src="https://unpkg.com/vue-monnify/dist/vue-monnify.min.js"></script>
```

## Usage

```vue
<template>
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
        :payment-description="'Payment reference'"
    >
      <!-- This could be an html template -->
       Make Payment
    </vue-monnify>
</template>

<script type="text/javascript">
  import VueMonnify from 'vue-monnify';
  export default {
      components: {
          VueMonnify
      },
      
      data(){
          return{
            monnifyAPIKey: process.env.MONNIFYAPIKEY, // This has both test and product values
            monnifyContractCode: process.env.MONNIFYCONTRACTCODE, // This has both test and product values
            monnifyIsTest: process.env.MONNIFYISTEST, // This should be true in test/dev environment and false in production
            payMetadata: {}, // This can be populated with key/values as you wish
            email: "customer@domain.com", // Customer email
            amount: 10000 // of type:Number and in naira
          }
      },
      
      computed: {
        payRef(){
          let _ref = "";
          const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for( let i=0; i < 10; i++ )
            _ref += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));

          return _ref;
        }
      },

      methods: {
        monnifyComplete: function(response){
          // Perform other operations upon complete
          console.log("Monnify Payment Complete", response)
        },
        monnifyClose: function(data){
          // Perform other operations upon close
          console.log("Monnify Payment closed", data)
        }
      }
  }
</script>
```

## For Nuxt
In /plugin/components.js
```javascript 1.8
import Vue from 'vue'
import VueMonnify from 'vue-monnify'

Vue.use('VueMonnify', VueMonnify)

// Other components package can be here too.
```

In nuxt.config.js
``` javascript 1.8
//...
plugins: [
  '@/plugins/components',
],
//...
```

In page or component as seen above (where its used)  
You don't need to add
```javascript 1.8
import VueMonnify from 'vue-monnify';
```

## All Props Available
```
reference: String (required)
contractCode: String (required)
apiKey: String (required)
customerEmail: String (required)
customerName: String (required)
customerMobileNumber: String (required)
amount: Number (required)
isTestMode: Boolean (required) [true] // possible values: [false] or [true]
onComplete: Function (required)
onClose: Function (required)
metadata: Object (optional) [{}]
currency: String (optional) ['NGN']
paymentDescription: String (optional) ['']
paymentMethods: StringArray (optional) ['ACCOUNT_TRANSFER'] // possible values: ['CARD', 'ACCOUNT_TRANSFER']
btnClass: String (optional)['']

i.e
// prop: DataType (required or optional) [default value]
```

## Development and Testing
To simulate a bank transfer, Monnify provided a bank app simulator that works nicely. [Click here](https://websim.sdk.monnify.com/#/bankingapp)

## Contribution

Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities

## Appreciation

Give it a star and share the link to the repo on your social platforms.  
Thanks! Adedoyin Akande,  
Twitter: [@aeadedoyin ](https://twitter.com/aeadedoyin)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
