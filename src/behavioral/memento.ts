class Memento {
  private state: Object;

  public constructor(state: Object) {
    this.state = state;
  }

  public getState(): Object {
    return this.state;
  }
}

class Originator {
  private state: Object = {};

  public setState(state: Object) {
    console.log("Originator: Setting state to ", this.state);

    this.state = state;
  }

  public commit(): Memento {
    console.log("Originator: Saving to Memento.");

    return new Memento(this.state);
  }
  public roolback(m: Memento) {
    this.state = m.getState();

    console.log("Originator: State after restoring from Memento: ", this.state);
  }
}

class Caretaker {
  private mementos: Memento[] = [];

  public addMemento(m: Memento) {
    this.mementos.push(m);
  }

  public getMemento(index: number): Memento {
    return this.mementos[index];
  }
}

// Example

let caretaker: Caretaker = new Caretaker();
let originator: Originator = new Originator();
originator.setState({ id: Math.random(), message: "initial commit" });
originator.setState({ id: Math.random(), message: "Tiny fix" });
caretaker.addMemento(originator.commit());
originator.setState({ id: Math.random(), message: "Add cors" });
caretaker.addMemento(originator.commit());

originator.setState({ id: Math.random(), message: "Hopla" });

originator.roolback(caretaker.getMemento(0));
