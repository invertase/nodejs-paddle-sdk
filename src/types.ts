import { PaddleWebhook } from './webhook';

export type State = 'active' | 'trialing' | 'past_due' | 'deleted' | 'paused';

export type PlanType = 'day' | 'week' | 'month' | 'year';

export type ListCouponsParameters = {
  // The specific product/subscription ID.
  product_id: number;
};

export type Coupon = {
  coupon: string;
  description: string;
  discount_type: 'flat' | 'percentage';
  discount_amount: number;
  discount_currency: string;
  allowed_uses: number;
  times_used: number;
  is_recurring: boolean;
  expires: string;
};

export type ListCouponsResponse = Coupon[];

export type CreateCouponsParameters = {
  // Will be randomly generated if not specified.
  coupon_code?: string;
  // Prefix for generated codes. Not valid if coupon_code is specified.
  coupon_prefix?: string;
  // Number of coupons to generate. Not valid if coupon_code is specified.
  num_coupons?: number;
  // Description of the coupon. This will be displayed in the Seller Dashboard.
  description?: string;
  // Either product (valid for specified products or subscription plans) or checkout (valid for any checkout).
  coupon_type: 'product' | 'checkout';
  // Comma-separated list of product IDs. Required if coupon_type is product.
  product_ids?: string;
  // Either flat or percentage.
  discount_type: 'flat' | 'percentage';
  // A currency amount (eg. 10.00) if discount_type is flat, or a percentage amount (eg. 10 for 10%) if discount_type is percentage.
  discount_amount: number;
  // The currency must match the balance currency specified in your account. Required if discount_amount is flat.
  currency?: 'USD' | 'GBP' | 'EUR';
  // Number of times a coupon can be used in a checkout. This will be set to 999,999 by default, if not specified.
  allowed_uses?: number;
  // The date (in format YYYY-MM-DD) the coupon is valid until. The coupon will expire on the date at 00:00:00 UTC.
  expires?: string;
  // If the coupon is used on subscription products, this indicates whether the discount should apply to recurring payments after the initial purchase.
  recurring?: 0 | 1;
  // The name of the coupon group this coupon should be assigned to.
  group?: string;
};

export type CreateCouponsResponse = {
  coupon_codes: string[];
};

export type DeleteCouponsParameters = {
  // Identify the coupon to delete.
  coupon_code: string;
  // The specific product/subscription ID.
  product_id?: number;
};

export type UpdateCouponsParameters = {
  // Identify the coupon to update (You must specify either coupon_code or group, but not both).
  coupon_code?: string;
  // The name of the group of coupons you want to update.
  group?: string;
  // New code to rename the coupon to.
  new_coupon_code?: string;
  // New group name to move coupon to.
  new_group?: string;
  // Comma-separated list of products e.g. 499531,1234,123546. If blank then remove associated products.
  product_ids?: string;
  // The date (in format YYYY-MM-DD) the coupon is valid until. The coupon will expire on the date at 00:00:00 UTC.
  expires?: string;
  // Number of times each coupon can be used.
  allowed_uses?: number;
  // Currency of the discount_amount (required if the coupon’s discount_type is flat). The currency must match the balance currency specified in your account.
  currency?: 'USD' | 'GBP' | 'EUR';
  // A currency amount (eg. 10.00) if discount_type is flat, or a percentage amount (eg. 10 for 10%) if discount_type is percentage.
  discount_amount?: number;
  // If the coupon is used on subscription products, this indicates whether the discount should apply to recurring payments after the initial purchase.
  recurring?: 0 | 1;
};

export type UpdateCouponsResponse = {
  updated: number;
};

export type Product = {
  id: number;
  name: string;
  description: string | null;
  base_price: number;
  sale_price: null;
  screenshots: Record<string, unknown>[];
  icon: string;
  currency: 'USD' | 'GBP' | 'EUR';
};

export type ListProductsResponse = {
  total: number;
  count: number;
  products: Product[];
};

export type GenerateLicenseParameters = {
  // Product ID the license is to be associated to.
  product_id: number;
  // Number of activations allowed for the license.
  allowed_uses: number;
  // Specifies which date (in format YYYY-MM-DD) the license should expire on. Leave empty for license to never expire.
  expires_at?: string;
};

export type License = {
  license_code: string;
  expires_at: string;
};

export type GenerateLicenseResponse = License;

export type GeneratePayLinkParameters = {
  /**
   * The Paddle Product ID/Plan ID that you want to base this custom checkout on. Required if not using custom products.
   *
   * If no product_id is set, custom non-subscription product checkouts can be generated instead by specifying the required fields: title, webhook_url and prices. Note that coupon_code cannot be used with custom products.
   */
  product_id?: number;
  // The name of the product/title of the checkout. Required if product_id is not set.
  title?: string;
  /**
   * An endpoint that we will call with transaction information upon successful checkout, to allow you to fulfill the purchase.
   *
   * Only valid (and required) if product_id is not set. Not valid for subscription plans.
   *
   * Note: testing on localhost is not supported. Please use an internet-accessible URL.
   */
  webhook_url?: string;
  // Price(s) of the checkout for a one-time purchase or the initial payment of a subscription.
  prices?: string;
  // Recurring price(s) of the checkout (excluding the initial payment) only if the product_id specified is a subscription. To override the initial payment and all recurring payment amounts, both prices and recurring_prices must be set.
  recurring_prices?: string;
  // For subscription plans only. The number of days for the initial billing cycle. If you leave this field empty, the default trial days of the plan will be used.
  trial_days?: number;
  // A short message displayed below the product name on the checkout.
  custom_message?: string;
  // A coupon to be applied to the checkout. Note that this cannot be used with custom products, and is only valid if a product_id is set.
  coupon_code?: string;
  // Specifies if a coupon can be applied to the checkout. “Add Coupon” button on the checkout will be hidden as well if set to 0.
  discountable?: 0 | 1;
  // A URL for the product image/icon displayed on the checkout.
  image_url?: string;
  // A URL to redirect to once the checkout is completed. If the variable {checkout_hash} is included within the URL (e.g. https://mysite.com/thanks?checkout={checkout_hash}), the API will automatically populate the Paddle checkout ID in the redirected URL.
  return_url?: string;
  // Specifies if the user is allowed to alter the quantity of the checkout.
  quantity_variable?: 0 | 1;
  // Pre-fills the quantity selector on the checkout. Please note that free products/subscription plans are fixed to a quantity of 1. Any quantity over the maximum value will default to a quantity of 1.
  quantity?: number;
  // Specifies if the checkout link should expire. The generated checkout URL will be accessible until 23:59:59 (UTC) on the date specified (date in format YYYY-MM-DD).
  expires?: string;
  // Other Paddle vendor IDs whom you would like to split the funds from this checkout with.
  affiliates?: string;
  // Limit the number of times other Paddle vendors will receive funds from the recurring payments (for subscription products). The initial checkout payment is included in the limit. If you leave this field empty, the limit will not be applied.
  recurring_affiliate_limit?: number;
  // Whether you have gathered consent to market to the customer. customer_email is required if this property is set and you want to opt the customer into marketing.
  marketing_consent?: 0 | 1;
  // Pre-fills the customer email field on the checkout.
  customer_email?: string;
  // Pre-fills the customer country field on the checkout.
  customer_country?: string;
  // Pre-fills the customer postcode field on the checkout. This field is required if the customer_country requires postcode.
  customer_postcode?: string;
  // Specifies if checkout recovery emails can be sent to users who abandon the checkout process after entering their email address. An additional 10% transaction fee applies to checkouts we recover.
  is_recoverable?: 0 | 1;
  // A string of metadata you wish to store with the checkout. Will be sent alongside all webhooks associated with the order.
  passthrough?: string;
  // Pre-fills the sales tax identifier (VAT number) field on the checkout.
  vat_number?: string;
  // Pre-fills the Company Name field on the checkout. Required if vat_number is set.
  vat_company_name?: string;
  // Pre-fills the Street field on the checkout. Required if vat_number is set.
  vat_street?: string;
  // Pre-fills the Town/City field on the checkout. Required if vat_number is set.
  vat_city?: string;
  // Pre-fills the State field on the checkout.
  vat_state?: string;
  // Pre-fills the Country field on the checkout. Required if vat_number is set.
  vat_country?: string;
  // Pre-fills the Postcode field on the checkout. Required if vat_number is set.
  vat_postcode?: string;
};

export type PayLink = string;

export type GeneratePayLinkResponse = {
  url: PayLink;
};

export type ListTransactionsEntity = 'user' | 'subscription' | 'order' | 'checkout' | 'product';

export type ListTransactionsParameters = {
  // Entity type.
  entity: ListTransactionsEntity;
  // The id of the entity.
  entity_id: string | number;
  // The page of results to return. Each response page return 15 results each.
  page?: number;
};

export type Transaction = {
  order_id: string;
  checkout_id: string;
  amount: string;
  currency: 'USD' | 'GBP' | 'EUR';
  custom_data: string;
  status: State;
  created_at: string;
  passthrough: string | null;
  product_id: number;
  is_subscription: boolean;
  is_one_off: boolean;
  subscription: {
    subscription_id: number;
    status: State;
  } | null;
  user: {
    user_id: number;
    email: string;
    marketing_consent: boolean;
  };
  receipt_url: string;
};

export type ListTransactionsResponse = Transaction[];

export type RefundPaymentParameters = {
  // The order ID of the payment you wish to refund. NB. Subscription orders are hyphenated and one-time orders are an integer.
  order_id: string;
  // Partial amount to refund in the currency of the order. The full payment is refunded if this parameter is not provided.
  amount?: number;
  // Reason for providing the refund. This will be displayed in the Seller Dashboard.
  reason?: string;
};

export type RefundPaymentResponse = {
  refund_request_id: number;
};

export type ListPlansParameters = {
  // Filter: The product/plan ID
  plan?: number;
};

export type Plan = {
  id: number;
  name: string;
  billing_type: PlanType;
  billing_period: number;
  initial_price: { [currency_code: string]: string | number };
  recurring_price: { [currency_code: string]: string | number };
  trial_days: number;
};

export type ListPlansResponse = Plan[];

export type CreatePlanParameters = {
  // The name of the subscription plan.
  plan_name: string;
  // The length for the plan interval type. So if the plan_length is set to 2 with a plan_type of month, the plan interval will be every 2 months.
  plan_length: string;
  // The plan interval type.
  plan_type: PlanType;
  // The length of the trial period in days.
  plan_trial_days?: number;
  // Default currency of the plan.
  main_currency_code?: string;
  // The recurring price in USD for the plan.
  recurring_price_usd?: string;
  // The recurring price in GBP for the plan.
  recurring_price_gbp?: string;
  // The recurring price in EUR for the plan.
  recurring_price_eur?: string;
};

export type CreatePlanResponse = {
  product_id: number;
};

export type ListUsersParameters = {
  // Filter: A specific user subscription ID
  subscription_id?: number;
  // Filter: The subscription plan ID
  plan_id?: number;
  // Filter: The user subscription status.
  state?: State;
  // Paginate return results.
  page?: number;
  // Number of subscription records to return per page.
  results_per_page?: number;
};

export type User = {
  subscription_id: number;
  plan_id: number;
  user_id: number;
  user_email: string;
  marketing_consent: boolean;
  custom_data: string;
  state: State;
  signup_date: string;
  last_payment: {
    amount: number;
    currency: string;
    date: string;
  } | null;
  next_payment: {
    amount: number;
    currency: string;
    date: string;
  } | null;
  update_url: string;
  cancel_url: string;
  paused_at?: string;
  paused_from?: string;
  payment_information:
    | {
        payment_method: 'card';
        card_type: 'master' | 'visa' | 'american_express' | 'discover' | 'jcb' | 'maestro' | 'diners_club' | 'unionpay';
        last_four_digits: string;
        expiry_date: string;
      }
    | {
        payment_method: 'paypal';
      };
};

export type ListUsersResponse = User[];

export type UpdateUserParameters = {
  // The ID of the subscription you’re updating.
  subscription_id: number;
  // The new quantity to be applied to the subscription. If there are no changes to it, you will still need to set it with the current value when calling this API. For non-quantity subscription plans, always set the value to 1.
  quantity?: number;
  // Optional, but required if setting recurring_price. The currency that the recurring price should be charged in. E.g. USD, GBP, EUR, etc. This must be the same as the currency of the existing subscription.
  currency?: 'USD' | 'GBP' | 'EUR';
  // The new recurring price per quantity unit to apply to the subscription. Please note this is a singular price, i.e 11.00.
  recurring_price?: number;
  // If the subscription should bill for the next interval at the revised figures immediately.
  bill_immediately?: boolean;
  // The new plan ID to move the subscription to.
  plan_id?: number;
  // Whether the change in subscription should be prorated.
  prorate?: boolean;
  // Retain the existing modifiers on the user subscription.
  keep_modifiers?: boolean;
  // Update the additional data associated with this subscription, like additional features, add-ons and seats. This will be included in all subsequent webhooks, and is often a JSON string of relevant data.
  passthrough?: string;
  // Whether a subscription should be paused or restarted. If the subscription is not paused and this is set to true, the  will be changed to “paused” when the subscription’s next payment date is reached.
  pause?: boolean;
};

export type UpdateUserResponse = {
  subscription_id: number;
  user_id: number;
  plan_id: number;
  next_payment: {
    amount: number;
    currency: string;
    date: string;
  };
};

export type CancelUserParameters = {
  // The specific user subscription ID.
  subscription_id: number;
};

export type ListModifiersParameters = {
  // Filter: Modifiers for a specific subscription.
  subscription_id?: string;
  // Filter: The product/plan ID
  plan_id?: string;
};

export type Modifier = {
  modifier_id: number;
  subscription_id: number;
  amount: string;
  currency: string;
  is_recurring: boolean;
  description?: string;
};

export type ListModifiersResponse = Modifier[];

export type CreateModifiersParameters = {
  // The ID of the subscription that you want to add a modifier for.
  subscription_id: number;
  // Whether to retain the modifiers on the subscription. By default we retain them, but you can specify this field as false to.
  modifier_recurring?: boolean;
  // The amount will be in the currency of the subscription.
  modifier_amount: number;
  // A description text to be displayed on the buyer’s receipt email and invoice.
  modifier_description?: string;
};

export type CreateModifiersResponse = {
  subscription_id: number;
  modifier_id: number;
};

export type DeleteModifiersParameters = {
  // A specific modifier ID
  modifier_id: number;
};

export type ListPaymentsParameters = {
  // Filter: Payments for a specific subscription.
  subscription_id?: number;
  // Filter: The product/plan ID (single or comma-separated values).
  plan?: number;
  // Filter: Payment is paid (0 = No, 1 = Yes).
  is_paid?: 0 | 1;
  // Filter: Payments starting from (date in format YYYY-MM-DD)
  from?: string;
  // Filter: Payments up to (date in format YYYY-MM-DD)
  to?: string;
  // Filter: Non-recurring payments created from the  (0 = No, 1 = Yes)
  is_one_off_charge?: 0 | 1;
};

export type Payment = {
  id: number;
  subscription_id: number;
  amount: number;
  currency: string;
  payout_date: string;
  is_paid: 0 | 1;
  is_one_off_charge: 0 | 1;
  receipt_url: string;
};

export type ListPaymentsResponse = Payment[];

export type ReschedulePaymentParameters = {
  // The upcoming subscription payment ID. This can be obtained by calling the List Payments API.
  payment_id: number;
  // The date (in format YYYY-MM-DD) you want to move the payment to.
  date: string;
};

export type CreateOneOffChargeParameters = {
  // Subscription ID.
  subscription_id: number;
  // The amount for the one-off charge.
  amount: number;
  // The name of the one-off charge - this will be visible to the buyers and will show up in the invoice as a line item, so that a buyer can always refer back to the invoice to know how much they were charged and what for.
  charge_name: string;
};

export type CreateOneOffChargeResponse = {
  invoice_id: number;
  subscription_id: number;
  amount: string;
  currency: string;
  payment_date: string;
  receipt_url: string;
  status: 'success' | 'pending';
};

export type GetWebhookHistoryParameters = {
  // Paginate returned results.
  page?: number;
  // Number of webhook alerts to return per page. Returns 10 alerts by default.
  alerts_per_page?: string;
  // The date and time (UTC - Coordinated Universal Time) at which the webhook occurred before (end date). In the format: YYYY-MM-DD HH:MM:SS
  query_head?: string;
  // The date and time (UTC - Coordinated Universal Time) at which the webhook occurred after (start date). In the format: YYYY-MM-DD HH:MM:SS
  query_tail?: string;
};

export type WebhookHistory = {
  id: string;
  alert_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  attempts: number;
  // The fields included are dependent upon the alert_name.
  fields: PaddleWebhook;
};

export type GetWebhookHistoryResponse = {
  current_page: number;
  total_pages: number;
  alerts_per_page: number;
  total_alerts: number;
  query_head: string;
  query_tail: string;
  data: WebhookHistory[];
};
