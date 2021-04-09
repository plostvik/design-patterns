interface Product {
  type: string;
  serial: number;
}

abstract class AbstractFactory {
  abstract createBear(): Product;
  abstract createDoll(): Product;
}

interface WoodenProduct extends Product {
  burns: boolean;
}

class WoodenToyFactory extends AbstractFactory {
  public createBear(): WoodenProduct {
    return { type: "wooden", serial: 1, burns: true };
  }
  public createDoll(): WoodenProduct {
    return { type: "wooden", serial: 1, burns: true };
  }
}

interface SoftProduct extends Product {
  isSoft: boolean;
}

class SoftToyFactory extends AbstractFactory {
  public createBear(): SoftProduct {
    return { type: "soft", serial: 1, isSoft: true };
  }
  public createDoll(): SoftProduct {
    return { type: "soft", serial: 1, isSoft: true };
  }
}

class MainFactoryCreator {
  static getFactory(value: number): AbstractFactory {
    if (value === 0) {
      return new WoodenToyFactory();
    }
    if (value === 1) {
      return new SoftToyFactory();
    }
    throw new Error("no such factory");
  }
}

const product = MainFactoryCreator.getFactory(0).createBear();
const product2 = MainFactoryCreator.getFactory(1).createDoll();

console.log(product.type);
console.log(product2.type);

export {};
