# Node Paddle SDK

A NodeJS library for integrating with [Paddle](https://paddle.com/).

The library provides full TypeScript definitions for the Paddle API & Webhook events.

## Installation

```bash
npm install @invertase/node-paddle-sdk --save
```

## Usage

```js
import { PaddleSDK } from '@invertase/node-paddle-sdk';

const paddle = new PaddleSDK(
  12345, // Required: Vendor ID
  'xxxx', // Required: Vendor Auth Code
  'xxxx', // Optional: Public Key
);
```

> The Public Key is optional, but required if using the `verifyWebhook` method.

### API

The library provides integration with the [Paddle API](https://developer.paddle.com/api-reference/intro) endpoints.

The `vendor_id` and `vendor_auth_code` parameters are not required and are automatically provided by the library.

Example usage:

```js
try {
  const coupons = await paddle.listCoupons({
    product_id: 123,
  });
} catch (e) {
  console.error(e.code, e.message);
}
```

### Product API

**Coupons**

- (`listCoupons`)[https://developer.paddle.com/api-reference/product-api/coupons/listcoupons]
- (`createCoupon`)[https://developer.paddle.com/api-reference/product-api/coupons/createcoupon]
- (`deleteCoupon`)[https://developer.paddle.com/api-reference/product-api/coupons/deletecoupon]
- (`deleteCoupon`)[https://developer.paddle.com/api-reference/product-api/coupons/deletecoupon]
- (`updateCoupon`)[https://developer.paddle.com/api-reference/product-api/coupons/updatecoupon]

**Products**

- (`listProducts`)[https://developer.paddle.com/api-reference/product-api/products/getproducts]

**Licenses**

- (`generateLicense`)[https://developer.paddle.com/api-reference/product-api/licenses/createlicense]

**Pay Links**

- (`generatePayLink`)[https://developer.paddle.com/api-reference/product-api/pay-links/createpaylink]

**Transactions**

- (`listTransactions`)[https://developer.paddle.com/api-reference/product-api/transactions/listtransactions]

**Payments**

- (`refundPayment`)[https://developer.paddle.com/api-reference/product-api/payments/refundpayment]

### Subscription API

**Plans**

- (`listPlans`)[https://developer.paddle.com/api-reference/subscription-api/plans/listplans]
- (`createPlan`)[https://developer.paddle.com/api-reference/subscription-api/plans/createplan]

**Users**

- (`listUsers`)[https://developer.paddle.com/api-reference/subscription-api/users/listusers]
- (`updateUser`)[https://developer.paddle.com/api-reference/subscription-api/users/updateuser]
- (`cancelUser`)[https://developer.paddle.com/api-reference/subscription-api/users/canceluser]

**Modifiers**

- (`listModifiers`)[https://developer.paddle.com/api-reference/subscription-api/modifiers/listmodifiers]
- (`createModifier`)[https://developer.paddle.com/api-reference/subscription-api/modifiers/createmodifier]
- (`deleteModifier`)[https://developer.paddle.com/api-reference/subscription-api/modifiers/deletemodifier]

**Payments**

- (`listPayments`)[https://developer.paddle.com/api-reference/subscription-api/payments/listpayments]
- (`reschedulePayment`)[https://developer.paddle.com/api-reference/subscription-api/payments/updatepayment]

**One-off Charges**

- (`createOneOffCharge`)[https://developer.paddle.com/api-reference/subscription-api/one-off-charges/createcharge]

### Alert API

**Webhooks**

- (`getWebhookHistory`)[https://developer.paddle.com/api-reference/alert-api/webhooks/webhooks]

## Webhooks

The library provides useful helpers for handling Webhooks, along with type definitions
for events for TypeScript users.

### Verifying a webhook

To verify a webhook, you must have provided a public key whilst creating a `PaddleSDK` instance
otherwise an error will be thrown. If the provided body does not conform to a Paddle Webhook
request (JSON response containing both a `alert_name` and `p_signature`), an error will also be thrown.

Pass the request body to the `verifyWebhook` method to verify the signature:

```js
// Express example

// Ensure you accept a JSON request body.
app.use(express.json());

app.post('/your-webhook-endpoint, (req, res) => {
  const verified = paddle.verifyWebhook(req.body);

  if (!verified) {
    return res.status(403).send('Invalid webhook request.');
  }

  ...
});
```

### TypeScript

The library provides type definitions for the various [Paddle Webhook events](https://developer.paddle.com/webhook-reference/intro). Using the `alert_name`, you can discover the type of the event:

```ts
import { PaddleWebhook } from '@invertase/node-paddle-sdk';

app.post('/your-webhook-endpoint, (req, res) => {
  const verified = paddle.verifyWebhook(req.body);

  if (!verified) {
    return res.status(403).send('Invalid webhook request.');
  }

  const event = req.body as PaddleWebhook;

  if (event.alert_name === 'subscription_created') {
    // `event` is now cast as a `SubscriptionCreatedWebhook`
    console.log(event.subscription_id);
  }
});
```

## License

- See [LICENSE](/LICENSE)

---

<p align="center">
  <a href="https://invertase.io/?utm_source=readme&utm_medium=footer&utm_campaign=docs.page">
    <img width="75px" src="https://static.invertase.io/assets/invertase/invertase-rounded-avatar.png">
  </a>
  <p align="center">
    Built and maintained by <a href="https://invertase.io/?utm_source=readme&utm_medium=footer&utm_campaign=docs.page">Invertase</a>.
  </p>
</p>
