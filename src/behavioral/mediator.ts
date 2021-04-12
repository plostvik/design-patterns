interface Mediator {
  send(msg: string, colleague: Colleague): void;
}

class Colleague {
  public mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  public send(msg: string): void {
    throw new Error("Abstract Method!");
  }

  public receive(msg: string): void {
    throw new Error("Abstract Method!");
  }
}

class ConcreteColleagueA extends Colleague {
  public send(msg: string): void {
    this.mediator.send(msg, this);
  }

  public receive(msg: string): void {
    console.log(msg, "`receive` of ConcreteColleagueA is being called!");
  }
}

class ConcreteColleagueB extends Colleague {
  public send(msg: string): void {
    this.mediator.send(msg, this);
  }

  public receive(msg: string): void {
    console.log(msg, "`receive` of ConcreteColleagueB is being called!");
  }
}

class ConcreteMediator implements Mediator {
  public concreteColleagueA: ConcreteColleagueA = {
    send: () => {},
    receive: () => {},
    mediator: { send: () => {} },
  };
  public concreteColleagueB: ConcreteColleagueB = {
    send: () => {},
    receive: () => {},
    mediator: { send: () => {} },
  };

  public send(msg: string, colleague: Colleague): void {
    if (this.concreteColleagueA === colleague) {
      this.concreteColleagueB.receive(msg);
    } else {
      this.concreteColleagueA.receive(msg);
    }
  }
}

const cm = new ConcreteMediator();
const cm1 = new ConcreteColleagueA(cm);
const cm2 = new ConcreteColleagueB(cm);
cm.concreteColleagueA.send("`send` of ConcreteColleagueA is being called!");
cm.concreteColleagueB.send("`send` of ConcreteColleagueB is being called!");

//пример с чатом

const Participant = function (name) {
  this.name = name;
  this.chatroom = null;
};

Participant.prototype = {
  send: function (message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function (message, from) {
    log.add(from.name + " to " + this.name + ": " + message);
  },
};

const Chatroom = function () {
  const participants = {};

  return {
    register: function (participant) {
      participants[participant.name] = participant;
      participant.chatroom = this;
    },

    send: function (message, from, to) {
      if (to) {
        // single message
        to.receive(message, from);
      } else {
        // broadcast message
        for (key in participants) {
          if (participants[key] !== from) {
            participants[key].receive(message, from);
          }
        }
      }
    },
  };
};

const yoko = new Participant("Yoko");
const john = new Participant("John");
const paul = new Participant("Paul");
const ringo = new Participant("Ringo");

const chatroom = new Chatroom();
chatroom.register(yoko);
chatroom.register(john);
chatroom.register(paul);
chatroom.register(ringo);

yoko.send("All you need is love.");
yoko.send("I love you John.");
john.send("Hey, no need to broadcast", yoko);
paul.send("Ha, I heard that!");
ringo.send("Paul, what do you think?", paul);
