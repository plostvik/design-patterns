interface BritishPlug {
  plugThreeClams(): void;
  plugThenCry(): void;
}

interface EuropeanPlug {
  plugTwoClams(): void;
}

class User {
  plugEuropean(instance: EuropeanPlug): void {
    console.log(instance.plugTwoClams());
  }
}

class Adapter {
  converToEuropean(instance: BritishPlug): EuropeanPlug {
    return {
      plugTwoClams: () => {
        instance.plugThenCry();
        instance.plugThreeClams();
      },
    };
  }
}

const user = new User();
user.plugEuropean(
  new Adapter().converToEuropean({
    plugThreeClams: () => console.log("I'm British"),
    plugThenCry: () => console.log("Cry"),
  }),
);

export {};
