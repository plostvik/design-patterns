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

//one more example

class ImageCreator {
  constructor(url: string) {}
}

class Snowflake {
  image: ImageCreator;
  constructor(public style: string) {
    let url = style + ".png";
    this.image = new ImageCreator(url);
  }
  render(x: number, y: number, angle: number): void {
    // ...
  }
}

class SnowflakeFactory {
  cache: {
    [style: string]: Snowflake;
  } = {};
  get(style: string): Snowflake {
    let snowflake: Snowflake;
    if (this.cache.hasOwnProperty(style)) {
      snowflake = this.cache[style];
    } else {
      snowflake = new Snowflake(style);
      this.cache[style] = snowflake;
    }
    return snowflake;
  }
}
