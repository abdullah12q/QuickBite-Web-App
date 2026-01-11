export class PaymentStrategy {
  pay(amount) {
    throw new Error("Method 'pay()' must be implemented.");
  }
}

export class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Processing Credit Card payment of $${amount}`);
    return "PAID_CARD";
  }
}

export class CashPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Payment pending: Cash on Delivery for $${amount}`);
    return "PENDING_CASH";
  }
}

export class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  executePayment(amount) {
    return this.strategy.pay(amount);
  }
}
