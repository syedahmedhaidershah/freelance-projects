const Stripe = require('./stripe.paymentgateway');

class PaymentGateway {
  constructor(paymentGateway) {
    this.paymentGateway = paymentGateway;
  }

  /**
   * Deposit amount into recipient account
   * @param {number} amount the amount to deposit in account
   * @param {string} accountIdentifier a unique account identifier
   * @param {string} receiptEmail recipient email address
   * @param {string} transactionId unique transaction id from hikma finance module
   * @param {string} currency currency in which deposit is to be made
   * @param {string} description description stating the purpose of the deposit
   * @param {object} metaData any additional details that needs to be passed along with deposit call
   */
  // eslint-disable-next-line class-methods-use-this
  async deposit(amount, receiptEmail, accountIdentifier, transactionId, metaData = {}, description = 'Hikma Deposit', currency = 'usd') {
    const transactionDetails = await this.paymentGateway.deposit(
      amount,
      receiptEmail,
      accountIdentifier,
      transactionId,
      metaData,
      description,
      currency,
    );
    return {
      status: 'PENDING',
      transactionDetails,
    };
  }

  /**
   * Parse response from hook
   * Function accept req object since parsing hook response for all payment gateways is different
   * E.g Stripe parse hook event using raw response instead of parse json
   * @param {object} hookRequest express request object for hook
   */
  // eslint-disable-next-line class-methods-use-this
  async parseHook(hookRequest) {
    const parsedHookBody = await this.paymentGateway.parseHook(hookRequest);
    return { ...parsedHookBody };
  }

  /**
   * Payout amount to account
   * @param {number} amount the amount to payout
   * @param {string} accountIdentifier a unique account identifier
   * @param {string} receiptEmail recipient email address
   * @param {string} currency currency in which payout is to be made
   * @param {string} description description stating the purpose of the payout
   * @param {object} metaData any additional details that needs to be passed along with payout call
   */
  // eslint-disable-next-line class-methods-use-this
  async payout(amount, receiptEmail, accountIdentifier, metaData = {}, description = 'Hikma Payout', currency = 'usd') {
    // return whatever resulting object from the actual payment object function
    return true;
  }

  /**
   * Payout amount to account
   * @param {number} amount the amount to payout
   * @param {string} accountIdentifier a unique account identifier
   * @param {string} receiptEmail recipient email address
   * @param {string} currency currency in which payout is to be made
   * @param {string} description description stating the purpose of the payout
   * @param {object} metaData any additional details that needs to be passed along with payout call
   */
  // eslint-disable-next-line class-methods-use-this
  async refund(amount, receiptEmail, accountIdentifier, metaData = {}, description = 'Hikma Refund', currency = 'usd') {
    return true;
  }
}

module.exports = new PaymentGateway(new Stripe());
