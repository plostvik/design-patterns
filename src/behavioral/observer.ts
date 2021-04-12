interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notifyObservers(): void;
}

interface Observer {
  update: (temperature: number) => void;
}

class WeatherStation implements Subject {
  private temperature: number = 10;
  private observers: Observer[] = [];

  setTemprature(temp: number) {
    console.log("new temprature is: " + temp);

    this.temperature = temp;
    this.notifyObservers();
  }

  registerObserver(o: Observer): void {
    this.observers.push(o);
  }
  removeObserver(o: Observer): void {
    this.observers.filter((obs) => obs !== o);
  }
  notifyObservers(): void {
    this.observers.forEach((obs) => obs.update(this.temperature));
  }
}
//obs 1
class TempratureDisplay implements Observer {
  private subject: Subject;

  constructor(weatherStation: Subject) {
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }

  public update(temperature: number) {
    console.log("TemperatureDisplay: i need to update my display");
  }
}
//obs 2
class Fan implements Observer {
  private subject: Subject;

  constructor(weatherStation: Subject) {
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }

  public update(temperature: number) {
    if (temperature > 25) {
      console.log("It's hot here, turning fan on");
    }
    return "It's nice and cool, turning myself off";
  }
}

const weatherStation = new WeatherStation();

const tempDisplay = new TempratureDisplay(weatherStation);
const fan = new Fan(weatherStation);

weatherStation.setTemprature(20);
weatherStation.setTemprature(30);
