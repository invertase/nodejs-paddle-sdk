import got from 'got';
import { createVerify } from 'crypto';

import {
  CancelUserParameters,
  CreateCouponsParameters,
  CreateCouponsResponse,
  CreateModifiersParameters,
  CreateModifiersResponse,
  CreateOneOffChargeParameters,
  CreateOneOffChargeResponse,
  CreatePlanParameters,
  CreatePlanResponse,
  DeleteCouponsParameters,
  DeleteModifiersParameters,
  GenerateLicenseParameters,
  GenerateLicenseResponse,
  GeneratePayLinkParameters,
  GeneratePayLinkResponse,
  GetWebhookHistoryParameters,
  GetWebhookHistoryResponse,
  ListCouponsParameters,
  ListCouponsResponse,
  ListModifiersParameters,
  ListModifiersResponse,
  ListPaymentsParameters,
  ListPaymentsResponse,
  ListPlansParameters,
  ListPlansResponse,
  ListProductsResponse,
  ListTransactionsParameters,
  ListTransactionsResponse,
  ListUsersParameters,
  ListUsersResponse,
  RefundPaymentParameters,
  RefundPaymentResponse,
  ReschedulePaymentParameters,
  UpdateCouponsParameters,
  UpdateCouponsResponse,
  UpdateUserParameters,
  UpdateUserResponse,
} from './types';

export * from './types';
export * from './webhook';

type PaddleApiResult<T> =
  | {
      success: true;
      response: T;
    }
  | {
      success: false;
      error: {
        code: number;
        message: string;
      };
    };

class PaddleHttpError extends Error {
  public readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export class PaddleSDK {
  public readonly vendorId: number;
  public readonly vendorAuthCode: string;
  public readonly publicKey?: string;
  public readonly server?: string;

  public constructor(vendorId: number, vendorAuthCode: string, publicKey?: string, server?: string) {
    this.vendorId = vendorId;
    this.vendorAuthCode = vendorAuthCode;
    this.publicKey = publicKey;
    this.server = server || 'https://vendors.paddle.com/api/2.0';

    if (this.server.endsWith('/')) {
      this.server = this.server.substring(0, this.server.length - 1);
    }
  }

  private async _request<T>(method: 'GET' | 'POST', path: string, body?: Record<string, any>): Promise<T> {
    const url = `${this.server}${path}`;
    const res = await got(url, {
      method,
      form: {
        vendor_id: this.vendorId,
        vendor_auth_code: this.vendorAuthCode,
        ...(body || {}),
      },
    }).json<PaddleApiResult<T>>();

    if (res.success === true) {
      return res.response;
    }

    throw new PaddleHttpError(res.error.code, res.error.message);
  }

  public async listCoupons(parameters: ListCouponsParameters): Promise<ListCouponsResponse> {
    return this._request<ListCouponsResponse>('POST', '/product/list_coupons', parameters);
  }

  public async createCoupon(parameters: CreateCouponsParameters): Promise<CreateCouponsResponse> {
    return this._request<CreateCouponsResponse>('POST', '/product/create_coupon', parameters);
  }

  public async deleteCoupon(parameters: DeleteCouponsParameters): Promise<undefined> {
    return this._request<undefined>('POST', '/product/delete_coupon', parameters);
  }

  public async updateCoupon(parameters: UpdateCouponsParameters): Promise<UpdateCouponsResponse> {
    return this._request<UpdateCouponsResponse>('POST', '/product/update_coupon', parameters);
  }

  public async listProducts(): Promise<ListProductsResponse> {
    return this._request<ListProductsResponse>('POST', '/product/get_products');
  }

  public async generateLicense(parameters: GenerateLicenseParameters): Promise<GenerateLicenseResponse> {
    return this._request<GenerateLicenseResponse>('POST', '/product/generate_license', parameters);
  }

  public async generatePayLink(parameters: GeneratePayLinkParameters): Promise<GeneratePayLinkResponse> {
    return this._request<GeneratePayLinkResponse>('POST', '/product/generate_pay_link', parameters);
  }

  public async listTransactions(parameters: ListTransactionsParameters): Promise<ListTransactionsResponse> {
    const { entity, entity_id, ...rest } = parameters;
    return this._request<ListTransactionsResponse>('POST', `/${entity}/${entity_id}/transactions`, rest);
  }

  public async refundPayment(parameters: RefundPaymentParameters): Promise<RefundPaymentResponse> {
    return this._request<RefundPaymentResponse>('POST', '/payment/refund', parameters);
  }

  public async listPlans(parameters: ListPlansParameters): Promise<ListPlansResponse> {
    return this._request<ListPlansResponse>('POST', '/subscription/plans', parameters);
  }

  public async createPlan(parameters: CreatePlanParameters): Promise<CreatePlanResponse> {
    return this._request<CreatePlanResponse>('POST', '/subscription/plans_create', parameters);
  }

  public async listUsers(parameters: ListUsersParameters): Promise<ListUsersResponse> {
    return this._request<ListUsersResponse>('POST', '/subscription/users', parameters);
  }

  public async updateUser(parameters: UpdateUserParameters): Promise<UpdateUserResponse> {
    return this._request<UpdateUserResponse>('POST', '/subscription/users/update', parameters);
  }

  public async cancelUser(parameters: CancelUserParameters): Promise<undefined> {
    return this._request<undefined>('POST', '/subscription/users_cancel', parameters);
  }

  public async listModifiers(parameters: ListModifiersParameters): Promise<ListModifiersResponse> {
    return this._request<ListModifiersResponse>('POST', '/subscription/modifiers', parameters);
  }

  public async createModifier(parameters: CreateModifiersParameters): Promise<CreateModifiersResponse> {
    return this._request<CreateModifiersResponse>('POST', '/subscription/modifiers/create', parameters);
  }

  public async deleteModifier(parameters: DeleteModifiersParameters): Promise<undefined> {
    return this._request<undefined>('POST', '/subscription/modifiers/delete', parameters);
  }

  public async listPayments(parameters: ListPaymentsParameters): Promise<ListPaymentsResponse> {
    return this._request<ListPaymentsResponse>('POST', '/subscription/payments', parameters);
  }

  public async reschedulePayment(parameters: ReschedulePaymentParameters): Promise<undefined> {
    return this._request<undefined>('POST', '/subscription/payments_reschedule', parameters);
  }

  public async createOneOffCharge(parameters: CreateOneOffChargeParameters): Promise<CreateOneOffChargeResponse> {
    const { subscription_id, ...rest } = parameters;
    return this._request<CreateOneOffChargeResponse>('POST', `/subscription/${subscription_id}/charge`, rest);
  }

  public async getWebhookHistory(parameters: GetWebhookHistoryParameters): Promise<GetWebhookHistoryResponse> {
    return this._request<GetWebhookHistoryResponse>('POST', '/alert/webhooks', parameters);
  }

  public verifyWebhook(body: any): boolean {
    if (!this.publicKey) {
      throw new Error('You must provide a publicKey when using the verifyWebhook method.');
    }

    const p_signature = body?.p_signature as string | null;
    const alert_name = body?.alert_name as string | null;

    if (!p_signature) {
      throw new Error('No p_signature field was found in the request body.');
    }

    if (!alert_name) {
      throw new Error('No alert_name field was found in the request body.');
    }

    const sorted = {};
    Object.keys(body)
      .filter((key) => key !== 'p_signature')
      .sort()
      .forEach((key) => (sorted[key] = body[key]));

    const serialized = require('locutus/php/var/serialize')(sorted);

    try {
      const verifier = createVerify('sha1');
      verifier.write(serialized);
      verifier.end();

      return verifier.verify(this.publicKey, p_signature, 'base64');
    } catch (err) {
      return false;
    }
  }
}
