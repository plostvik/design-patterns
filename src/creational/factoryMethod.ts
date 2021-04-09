interface BmwProp {
  model: string;
  price: number;
  maxSpeed: number;
}

class Bmw {
  public model: string;
  public price: number;
  public maxSpeed: number;
  constructor(properties: BmwProp) {
    this.model = properties.model;
    this.price = properties.price;
    this.maxSpeed = properties.maxSpeed;
  }
}

enum BMW_TYPE {
  X5 = "X5",
  X6 = "X6",
}

class BmwFactory {
  create(type: BMW_TYPE) {
    if (type === "X5")
      return new Bmw({ model: type, price: 108000, maxSpeed: 300 });
    if (type === "X6")
      return new Bmw({ model: type, price: 111000, maxSpeed: 320 });
  }
}

enum TEACHER_TYPE {
  CODING = "coding",
  MUSIC = "music",
}

interface TeacherProperties {
  name: string;
}

class Teacher {
  public name: string;
  constructor(properties: TeacherProperties) {
    this.name = properties.name;
  }
}

interface CodingTeacherProperties {
  name: string;
  programmingLanguage: string;
}

class CodingTeacher extends Teacher {
  public programmingLanguage: string;
  constructor(properties: CodingTeacherProperties) {
    super(properties);
    this.programmingLanguage = properties.programmingLanguage;
  }
}

interface MusicTeacherProperties {
  name: string;
  instrument: string;
}

class MusicTeacher extends Teacher {
  public instrument: string;
  constructor(properties: MusicTeacherProperties) {
    super(properties);
    this.instrument = properties.instrument;
  }
}

class TeacherFactory {
  public static getTeacher(
    type: TEACHER_TYPE.MUSIC,
    properties: MusicTeacherProperties,
  ): MusicTeacher;
  public static getTeacher(
    type: TEACHER_TYPE.CODING,
    properties: CodingTeacherProperties,
  ): CodingTeacher;
  public static getTeacher(
    type: TEACHER_TYPE,
    properties: MusicTeacherProperties & CodingTeacherProperties,
  ) {
    switch (type) {
      case TEACHER_TYPE.CODING:
        return new CodingTeacher(properties);
      case TEACHER_TYPE.MUSIC:
        return new MusicTeacher(properties);
      default:
        throw new Error("Wrong teacher type chosen");
    }
  }
}

const codingTeacher = TeacherFactory.getTeacher(TEACHER_TYPE.CODING, {
  programmingLanguage: "JavaScript",
  name: "John",
});

const musicTeacher = TeacherFactory.getTeacher(TEACHER_TYPE.MUSIC, {
  instrument: "Guitar",
  name: "Andy",
});

export {};

class Car {
  public produceCar(value: number): Car {
    if (value === 0) {
      return new BmW();
    }
    if (value === 1) {
      return new Mercedes();
    }
    throw new Error("no such car");
  }
}

class BmW extends Car {}
class Mercedes extends Car {}
