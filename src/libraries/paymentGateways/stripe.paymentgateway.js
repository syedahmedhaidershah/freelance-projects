const httpStatus = require('http-status');
const stripe = require('stripe');
const {
  stripe: {
    secretKey,
    hookSignSecret,
  },
} = require('../../config');
const {
  APIError,
  ErrorKeys,
} = require('..');

module.exports = class Stripe {
  constructor() {
    this.stripe = stripe(secretKey);
  }

  /**
    * Creates a payment intent with given amount
    * Set all other provided details as metadata
    * @param {number} amount the amount to deposit in account
    * @param {string} accountIdentifier a unique account identifier
    * @param {string} receiptEmail recipient email address
    * @param {string} transactionId unique transaction id from hikma finance module
    * @param {string} currency currency in which deposit is to be made
    * @param {string} description description stating the purpose of the deposit
    * @param {object} metaData additional details that needs to be passed along with deposit call
    */
  // eslint-disable-next-line class-methods-use-this
  async deposit(amount, receiptEmail, accountIdentifier, transactionId, metaData = {}, description = 'Hikma Deposit', currency = 'usd') {
    try {
      return await this.stripe.paymentIntents.create({
        amount: amount * 100,
        currency,
        description,
        receipt_email: receiptEmail,
        metadata: {
          accountIdentifier,
          transactionId,
          metaData,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
  * Verify event with signature for authenticity
  * @param {Object} event | stripe raw event object
  * @param {string} signature | stripe event signature
  * @returns {event} event | stripe event object
  * @throws {APIError}
  */
  // eslint-disable-next-line class-methods-use-this
  async parseHook(req) {
    try {
      const signature = req.headers['stripe-signature'];
      const event = req.rawBody;
      let verifiedEvent;
      try {
        verifiedEvent = await stripe.webhooks.constructEvent(event, signature, hookSignSecret);
      } catch (error) {
        throw new APIError(
          'Stripe evenet signature invalid',
          ErrorKeys.PAYMENT_GATEWAY_HOOK_SIGNATURE_INVALID.key,
          ErrorKeys.PAYMENT_GATEWAY_HOOK_SIGNATURE_INVALID.statusCode,
          true,
        );
      }
      // now check event type, for now we only support success case
      switch (verifiedEvent.type) {
        case 'payment_intent.succeeded': {
          const {
            id,
            amount,
            currency,
            description,
            metadata: {
              accountIdentifier,
              metaData,
            },
          } = verifiedEvent.data.object;
          // normalize amount
          const normalizedAmount = amount / 100;
          return {
            amount: normalizedAmount,
            currency,
            description,
            accountIdentifier,
            transactionId: id,
            metaData,
            status: 'APPROVED',
            paymentDetails: verifiedEvent.data.object,
          };
        }
        default:
          throw new APIError(
            'Stripe unexpected event',
            ErrorKeys.UNEXPECTED_HOOK_EVENT_TYPE.key,
            ErrorKeys.UNEXPECTED_HOOK_EVENT_TYPE.statusCode,
            true,
          );
      }
    } catch (error) {
      throw error;
    }
  }
};
