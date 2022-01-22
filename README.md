# plebpay-utils
Utility package for PlebPay.

[![NPM](https://img.shields.io/npm/v/plebpay-utils.svg)](https://www.npmjs.com/package/plebpay-utils)

## Usage

Script Tag
```js
    <script src="https://unpkg.com/plebpay-utils@1.0.8/dist/index.js" type="text/javascript"></script>
    <script>
        // replace with your own PlebPay paywall URL
        const plebPlayPaywallUrl = 'https://www.plebpay.com/c5bc98ff-a386-45ba-9b99-c3b16da9cdaf'
      
        window.PlebPay.redirectIfNecessary(plebPlayPaywallUrl)
    </script>
```

Module
```js
import { redirectIfNecessary } from 'plebpay-utils'

// replace with your own PlebPay paywall URL
const plebPlayPaywallUrl = 'https://www.plebpay.com/c5bc98ff-a386-45ba-9b99-c3b16da9cdaf'

redirectIfNecessary(plebPlayPaywallUrl)
```
