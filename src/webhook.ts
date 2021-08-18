import { State } from './types';

export type WebhookEventMap = {
  subscription_created: SubscriptionCreatedWebhook;
  subscription_updated: SubscriptionUpdatedWebhook;
  subscription_cancelled: SubscriptionCancelledWebhook;
  subscription_payment_succeeded: SubscriptionPaymentSucceededWebhook;
  subscription_payment_failed: SubscriptionPaymentFailedWebhook;
  subscription_payment_refunded: SubscriptionPaymentRefundedWebhook;
};

type WebhookBase = {
  alert_id: string;
  p_signature: string;
  event_time: string;
};

export type PaddleWebhook =
  | SubscriptionCreatedWebhook
  | SubscriptionUpdatedWebhook
  | SubscriptionCancelledWebhook
  | SubscriptionPaymentSucceededWebhook
  | SubscriptionPaymentFailedWebhook
  | SubscriptionPaymentRefundedWebhook;

export type SubscriptionCreatedWebhook = {
  alert_name: 'subscription_created';
  cancel_url: string;
  checkout_id: string;
  currency: string;
  email: string;
  marketing_consent: 0 | 1;
  next_bill_date: string;
  passthrough: string;
  quantity: string;
  source: string;
  status: State;
  subscription_id: string;
  subscription_plan_id: string;
  unit_price: string;
  user_id: string;
  update_url: string;
} & WebhookBase;

export type SubscriptionUpdatedWebhook = {
  alert_name: 'subscription_updated';
  cancel_url: string;
  checkout_id: string;
  email: string;
  marketing_consent: 0 | 1;
  new_price: string;
  new_quantity: string;
  new_unit_price: string;
  old_price: string;
  old_quantity: string;
  old_unit_price: string;
  currency: string;
  passthrough: string;
  status: State;
  subscription_id: string;
  subscription_plan_id: string;
  user_id: string;
  old_next_bill_date: string;
  old_status: State;
  old_subscription_plan_id: string;
  paused_at?: string;
  paused_from?: string;
  paused_reason?: string;
} & WebhookBase;

export type SubscriptionCancelledWebhook = {
  alert_name: 'subscription_cancelled';
  cancellation_effective_date: string;
  checkout_id: string;
  currency: string;
  email: string;
  marketing_consent: 0 | 1;
  passthrough: string;
  quantity: string;
  status: State;
  subscription_id: string;
  subscription_plan_id: string;
  unit_price: string;
  user_id: string;
} & WebhookBase;

export type SubscriptionPaymentSucceededWebhook = {
  alert_name: 'subscription_payment_succeeded';
  balance_currency: string;
  balance_earnings: string;
  balance_fee: string;
  balance_gross: string;
  balance_tax: string;
  checkout_id: string;
  country: string;
  coupon: string;
  currency: string;
  customer_name: string;
  earnings: string;
  email: string;
  fee: string;
  initial_payment: 0 | 1;
  instalments: string;
  marketing_consent: 0 | 1;
  next_bill_date: string;
  next_payment_amount: string;
  order_id: string;
  passthrough: string;
  payment_method: string;
  payment_tax: string;
  plan_name: string;
  quantity: string;
  receipt_url: string;
  sale_gross: string;
  status: State;
  subscription_id: string;
  subscription_payment_id: string;
  subscription_plan_id: string;
  unit_price: string;
  user_id: string;
} & WebhookBase;

export type SubscriptionPaymentFailedWebhook = {
  alert_name: 'subscription_payment_failed';
  amount: string;
  cancel_url: string;
  checkout_id: string;
  currency: string;
  email: string;
  marketing_consent: 0 | 1;
  next_retry_date: string;
  passthrough: string;
  quantity: string;
  status: State;
  subscription_id: string;
  subscription_payment_id: string;
  subscription_plan_id: string;
  update_url: string;
  instalments: string;
  order_id: string;
  user_id: string;
  attempt_number: string;
} & WebhookBase;

export type SubscriptionPaymentRefundedWebhook = {
  alert_name: 'subscription_payment_refunded';
  amount: string;
  balance_currency: string;
  balance_earnings_decrease: string;
  balance_fee_refund: string;
  balance_gross_refund: string;
  balance_tax_refund: string;
  checkout_id: string;
  currency: string;
  earnings_decrease: string;
  email: string;
  fee_refund: string;
  gross_refund: string;
  initial_payment: 0 | 1;
  instalments: string;
  marketing_consent: 0 | 1;
  order_id: string;
  passthrough: string;
  quantity: string;
  refund_reason: string;
  refund_type: 'full' | 'vat' | 'partial';
  status: State;
  subscription_id: string;
  subscription_payment_id: string;
  subscription_plan_id: string;
  tax_refund: string;
  unit_price: string;
  user_id: string;
} & WebhookBase;
