class OrderSubject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(order) {
    console.log(
      `[OBSERVER] Event Triggered: Order #${order._id} is now ${
        order.status || "Created"
      }`
    );
    this.observers.forEach((observer) => observer.update(order));
  }
}

// Simple Notification Observer
export class NotificationService {
  update(order) {
    console.log(
      `[EMAIL SERVICE] Sending email for Order #${order._id} status: ${order.status}`
    );
  }
}

const orderSubject = new OrderSubject();
orderSubject.subscribe(new NotificationService()); // Auto-subscribe service
export default orderSubject;
