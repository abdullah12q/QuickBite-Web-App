// 1. The Interface
class FoodItem {
  getCost() {
    return 0;
  }
  getDescription() {
    return "";
  }
}

// 2. The Base Component
export class BaseProduct extends FoodItem {
  constructor(dbProduct) {
    super();
    this.dbProduct = dbProduct;
  }

  getCost() {
    return this.dbProduct.Price;
  }

  getDescription() {
    return this.dbProduct.Name;
  }
}

// 3. The Decorators
export class Decorator extends FoodItem {
  constructor(foodItem) {
    super();
    this.foodItem = foodItem;
  }
}

export class ExtraCheese extends Decorator {
  getCost() {
    return this.foodItem.getCost() + 20;
  }
  getDescription() {
    return this.foodItem.getDescription() + " + Cheese";
  }
}

export class SpicySauce extends Decorator {
  getCost() {
    return this.foodItem.getCost() + 10;
  }
  getDescription() {
    return this.foodItem.getDescription() + " + Spicy Sauce";
  }
}

export class MakeItCombo extends Decorator {
  getCost() {
    return this.foodItem.getCost() + 50;
  }
  getDescription() {
    return this.foodItem.getDescription() + " (Combo)";
  }
}
