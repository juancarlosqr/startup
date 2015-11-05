/*
source:
http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
https://sourcemaking.com/design_patterns/observer
http://www.dofactory.com/javascript/observer-design-pattern
http://robdodson.me/javascript-design-patterns-observer/
https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/observer.html
https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
*/

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
  this.playing = false;
};

Movie.prototype = {
  constructor: Movie,
  play: function () {
    if (this.playing) {
      console.log(this.get('title'), 'is already playing...');
    }
    else {
      this.playing = true;
      this.notify(events.playing);
    }
  },
  stop: function () {
    if (this.playing) {
      this.playing = false;
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
  addActor: function (actor) {
    if (this.get('actors') === undefined) {
      this.set('actors', []);
    }
    this.get('actors').push(actor);
  },
  listActors: function () {
    var i;
    console.log(this.get('title'), 'actors');
    for (i = this.get('actors').length - 1; i >= 0; i--) {
      console.log(' - ', this.get('actors')[i].name);
    }
  },
  subscribe: function (observer) {
    this.observers.push(observer);
  },
  unsubscribe: function (observer) {
    var i,
      index = null;
    for (i = this.observers.length - 1; i >= 0; i--) {
      if (this.observers[i] === observer) {
        index = i;
      }
    }
    this.observers.splice(index, 1);
  },
  notify: function (event) {
    var i;
    for (i = this.observers.length - 1; i >= 0; i--) {
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

var DownloadableMovie = function () {};
DownloadableMovie.prototype = new Movie();
DownloadableMovie.prototype.constructor = DownloadableMovie;
DownloadableMovie.prototype.download = function () {
  console.log('Downloading', this.get('title') + '...');
};

// Mixin
var Social = function () {
  this.share = function (friendName) {
    console.log('Sharing', this.get('title'), 'with', friendName);
  };
  this.like = function () {
    console.log(this.get('title'), 'got a new like!');
  }; 
  return this;
};
Social.call(Movie.prototype);

var Actor = function (name) {
  this.name = name;
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
mov2.like();

var mov3 = new Movie('Interstellar');
mov3.subscribe(movObs1);
mov3.share('Kate Upton');

var mov4 = new DownloadableMovie();
mov4.subscribe(movObs2);
mov4.set('title', 'The Dark Knight Rises');
mov4.play();
mov4.download();

var tom = new Actor('Tom Hardy');
mov1.addActor(tom);
mov4.addActor(tom);

var christian = new Actor('Christian Bale');
mov4.addActor(christian);
mov4.listActors();

console.log(mov1.get('title'), mov1);
console.log(mov2.get('title'), mov2);
console.log(mov3.get('title'), mov3);
console.log(mov4.get('title'), mov4);
