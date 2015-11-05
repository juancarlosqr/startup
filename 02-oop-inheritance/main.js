// Events values
var events = {
  playing: 'playing',
  stopped: 'stopped'
};

var Movie = function (title) {
  this.attributes = {};
  this.observers = [];
  if (title) {
    this.set('title', title);
  }
  this.set('playing', false);
};

Movie.prototype = {
  constructor: Movie,
  play: function () {
    if(this.get(events.playing)) {
      console.log(this.get('title'), 'is already playing...');
    }
    else {
      this.set(events.playing, true);
      this.notify(events.playing);
    }
  },
  stop: function () {
    if(this.get(events.playing)) {
      this.set(events.playing, false);
      this.notify(events.stopped);
    } else {
      console.log(this.get('title'), 'is already stopped...');
    }
  },
  set: function (key, value) {
    this.attributes[key] = value;
  },
  get: function (key) {
    return this.attributes[key];
  },
  subscribe: function (observer) {
    this.observers.push(observer);
  },
  unsubscribe: function (observer) {
    var index = null;
    for (var i = this.observers.length - 1; i >= 0; i--) {
      if (this.observers[i] === observer) {
        index = i;
      }
    }
    this.observers.splice(index, 1);
  },
  notify: function (event) {
    for (var i = this.observers.length - 1; i >= 0; i--) {
      this.observers[i].fire(event, i, this.get('title'));
    }
  }
};

var MovieObserver = function () {};

MovieObserver.prototype = {
  constructor: MovieObserver,
  fire: function (event, observerIndex, title) {
    if (event === events.playing) {
      console.log('playing event is fired for observer', observerIndex);
      console.info('Playing', title + '...');
    }
    if (event === events.stopped) {
      console.log('stopped event is fired for observer', observerIndex);
      console.info('Stoping', title + '...');
    }
  }
};

// Creating the objects
var mov1 = new Movie('Inception');
var movObs1 = new MovieObserver();
var movObs2 = new MovieObserver();

mov1.subscribe(movObs1);
mov1.subscribe(movObs2);
mov1.play();
mov1.play();
mov1.stop();
// unsubscribe one observer
mov1.unsubscribe(movObs1);
console.log('Lets play it again');
mov1.play();
mov1.stop();

var mov2 = new Movie();
mov2.set('title', 'Avatar');

var mov3 = new Movie('Matrix');
mov3.subscribe(movObs1);
mov3.play();

var mov4 = new Movie();
mov4.set('title', 'Interstellar');

console.log('Title:', mov1.get('title'));
console.log('Title:', mov2.get('title'));
console.log('Title:', mov3.get('title'));
console.log('Title:', mov4.get('title'));
