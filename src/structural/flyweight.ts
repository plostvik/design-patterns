class Auto {
  private model;
  constructor(model: string) {
    this.model = model;
  }
}

class AutoFactory {
  private models: { [key: string]: Auto } = {};
  constructor(name: Auto) {
    this.models.name = name;
  }

  create(name: Auto) {
    let model = this.models[name];
    if (model) return model;
    this.models[name] = new Auto(name);
    return this.models[name];
  }
}

export {};
