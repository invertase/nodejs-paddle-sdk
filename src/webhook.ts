import { State } from './types';

export type WebhookEventMap = {
  subscription_created: SubscriptionCreatedWebhook;
  subscription_updated: SubscriptionUpdatedWebhook;
  subscription_cancelled: SubscriptionCancelledWebhook;
  subscription_payment_succeeded: SubscriptionPaymentSucceededWebhook;
  subscription_payment_failed: SubscriptionPaymentFailedWebhook;
  subscription_payment_refunded: SubscriptionPaymentRefundedWebhook;
  payment_succeeded: PaymentSucceededWebhook;
  payment_refunded: PaymentRefundedWebhook;
  locker_processed: LockerProcessedWebhook;
  payment_dispute_created: PaymentDisputeCreatedWebhook;
  payment_dispute_closed: PaymentDisputeClosedWebhook;
  high_risk_transaction_created: HighRiskTransactionCreatedWebhook;
  high_risk_transaction_updated: HighRiskTransactionUpdatedWebhook;
  transfer_created: TransferCreatedWebhook;
  transfer_paid: TransferPaidWebhook;
  new_audience_member: NewAudienceMemberWebhook;
  update_audience_member: UpdateAudienceMemberWebhook;
  invoice_paid: InvoicePaidWebhook;
  invoice_sent: InvoiceSentWebhook;
  invoice_overdue: InvoiceOverdueWebhook;
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
  | SubscriptionPaymentRefundedWebhook
  | PaymentSucceededWebhook
  | PaymentRefundedWebhook
  | LockerProcessedWebhook
  | PaymentDisputeCreatedWebhook
  | PaymentDisputeClosedWebhook
  | HighRiskTransactionCreatedWebhook
  | HighRiskTransactionUpdatedWebhook
  | TransferCreatedWebhook
  | TransferPaidWebhook
  | NewAudienceMemberWebhook
  | UpdateAudienceMemberWebhook
  | InvoicePaidWebhook
  | InvoiceSentWebhook
  | InvoiceOverdueWebhook;

export type SubscriptionCreatedWebhook = {
  alert_name: 'subscription_created';
  cancel_url: string;
  checkout_id: string;
  currency: string;
  custom_data: string;
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
  next_bill_date: string;
  old_price: string;
  old_quantity: string;
  old_unit_price: string;
  currency: string;
  custom_data: string;
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
  update_url: string;
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
  custom_data: string;
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
  custom_data: string;
  email: string;
  marketing_consent: 0 | 1;
  next_retry_date: string;
  passthrough: string;
  quantity: string;
  status: State;
  subscription_id: string;
  subscription_payment_id: string;
  subscription_plan_id: string;
  unit_price: string;
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
  custom_data: string;
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

export type PaymentSucceededWebhook = {
  alert_name: 'payment_succeeded';
  balance_currency: string;
  balance_earnings: string;
  balance_fee: string;
  balance_gross: string;
  balance_tax: string;
  checkout_id: string;
  country: string;
  coupon: string;
  currency: string;
  custom_data: string;
  customer_name: string;
  earnings: string;
  email: string;
  fee: string;
  ip: string;
  marketing_consent: 0 | 1;
  order_id: string;
  passthrough: string;
  payment_method: 'card' | 'paypal' | 'free' | 'apple-pay' | 'wire-transfer';
  payment_tax: string;
  product_id: string;
  product_name: string;
  quantity: string;
  receipt_url: string;
  sale_gross: string;
  used_price_override: string;
} & WebhookBase;

export type PaymentRefundedWebhook = {
  alert_name: 'payment_refunded';
  amount: string;
  balance_currency: string;
  balance_earnings_decrease: string;
  balance_fee_refund: string;
  balance_gross_refund: string;
  balance_tax_refund: string;
  checkout_id: string;
  currency: string;
  custom_data: string;
  earnings_decrease: string;
  email: string;
  fee_refund: string;
  gross_refund: string;
  marketing_consent: 0 | 1;
  order_id: string;
  passthrough: string;
  quantity: string;
  refund_reason: string;
  refund_type: 'full' | 'vat' | 'partial';
  tax_refund: string;
} & WebhookBase;

export type LockerProcessedWebhook = {
  alert_name: 'locker_processed';
  checkout_id: string;
  checkout_recovery: 0 | 1;
  coupon: string;
  custom_data: string;
  download: string;
  email: string;
  instructions: string;
  license: string;
  marketing_consent: 0 | 1;
  order_id: string;
  product_id: string;
  quantity: string;
  source: string;
};

export type PaymentDisputeCreatedWebhook = {
  alert_name: 'payment_dispute_created';
  amount: string;
  balance_amount: string;
  balance_currency: string;
  balance_fee: string;
  checkout_id: string;
  currency: string;
  email: string;
  fee_usd: string;
  marketing_consent: 0 | 1;
  order_id: string;
  passthrough: string;
  status: string;
} & WebhookBase;

export type PaymentDisputeClosedWebhook = {
  alert_name: 'payment_dispute_closed';
  amount: string;
  balance_amount: string;
  balance_currency: string;
  balance_fee: string;
  checkout_id: string;
  currency: string;
  email: string;
  fee_usd: string;
  marketing_consent: 0 | 1;
  order_id: string;
  passthrough: string;
  status: string;
} & WebhookBase;

export type HighRiskTransactionCreatedWebhook = {
  alert_name: 'high_risk_transaction_created';
  case_id: string;
  checkout_id: string;
  created_at: string;
  custom_data: string;
  customer_email_address: string;
  customer_user_id: string;
  marketing_consent: 0 | 1;
  passthrough: string;
  product_id: string;
  risk_score: string;
  status: 'pending';
} & WebhookBase;

export type HighRiskTransactionUpdatedWebhook = {
  alert_name: 'high_risk_transaction_updated';
  case_id: string;
  checkout_id: string;
  created_at: string;
  customer_email_address: string;
  customer_user_id: string;
  custom_data: string;
  marketing_consent: 0 | 1;
  order_id: string;
  passthrough: string;
  product_id: string;
  risk_score: string;
  status: 'accepted' | 'rejected';
} & WebhookBase;

export type TransferCreatedWebhook = {
  alert_name: 'transfer_created';
  amount: string;
  currency: string;
  payout_id: string;
  status: 'unpaid';
} & WebhookBase;

export type TransferPaidWebhook = {
  alert_name: 'transfer_paid';
  amount: string;
  currency: string;
  payout_id: string;
  status: 'paid';
} & WebhookBase;

export type NewAudienceMemberWebhook = {
  alert_name: 'new_audience_member';
  created_at: string;
  email: string;
  marketing_consent: 0 | 1;
  products: string;
  source: string;
  /**
   * @deprecated use marketing_consent instead
   */
  subscribed: string;
  user_id: string;
} & WebhookBase;

export type UpdateAudienceMemberWebhook = {
  alert_name: 'update_audience_member';
  new_customer_email: string;
  new_marketing_consent: 0 | 1;
  old_customer_email: string;
  old_marketing_consent: 0 | 1;
  products: string;
  source: string;
  user_id: string;
} & WebhookBase;

export type InvoicePaidWebhook = {
  alert_name: 'invoice_paid';
  payment_id: string;
  amount: string;
  sale_gross: string;
  term_days: string;
  status: 'paid';
  purchase_order_number: string;
  invoiced_at: string;
  currency: string;
  product_id: string;
  product_name: string;
  product_additional_information: string;
  customer_name: string;
  email: string;
  customer_vat_number: string;
  customer_company_number: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_zipcode: string;
  county: string;
  contract_id: string;
  contract_start_date: string;
  contract_end_date: string;
  passthrough: string;
  date_created: string;
  balance_currency: string;
  payment_tax: string;
  payment_method: 'card' | 'paypal' | 'apple-pay' | 'wire-transfer';
  fee: string;
  earnings: string;
  balance_earnings: string;
  balance_fee: string;
  balance_tax: string;
  balance_gross: string;
  date_reconciled: string;
} & WebhookBase;

export type InvoiceSentWebhook = {
  alert_name: 'invoice_sent';
  payment_id: string;
  amount: string;
  sale_gross: string;
  term_days: string;
  status: 'unpaid';
  purchase_order_number: string;
  invoiced_at: string;
  currency: string;
  product_id: string;
  product_name: string;
  product_additional_information: string;
  customer_id: string;
  customer_name: string;
  email: string;
  customer_vat_number: string;
  customer_company_number: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_zipcode: string;
  county: string;
  contract_id: string;
  contract_start_date: string;
  passthrough: string;
  date_created: string;
  balance_currency: string;
  payment_tax: string;
  fee: string;
  earnings: string;
} & WebhookBase;

export type InvoiceOverdueWebhook = {
  alert_name: 'invoice_overdue';
  payment_id: string;
  amount: string;
  sale_gross: string;
  term_days: string;
  status: 'overdue';
  purchase_order_number: string;
  invoiced_at: string;
  currency: string;
  product_id: string;
  product_name: string;
  product_additional_information: string;
  customer_id: string;
  customer_name: string;
  email: string;
  customer_vat_number: string;
  customer_company_number: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_zipcode: string;
  county: string;
  contract_id: string;
  contract_start_date: string;
  contract_end_date: string;
  passthrough: string;
  date_created: string;
  balance_currency: string;
  payment_tax: string;
  payment_method: 'card' | 'paypal' | 'apple-pay' | 'wire-transfer';
  fee: string;
  earnings: string;
} & WebhookBase;
