//return to work:
//https://www.udacity.com/course/viewer#!/c-ud989/l-3437288625/m-3530929039

(function(){
  var model = {};
  var controller = {};
  var listView = {};
  var catView = {};

  //Classes
  function Cat(name) {
    this.name = name;
    this.pic = 'https://placekitten.com/g/200/300';
    this.clickCount = 0;
  }

  Cat.prototype.clickCat = function() {
    this.clickCount++;
  };

  Cat.prototype.getId = function() {
    return this.id;
  };

  Cat.prototype.getCount = function() {
    return this.clickCount.toString();
  };

  Cat.prototype.getUrl = function() {
    return this.pic;
  };

  Cat.prototype.getName = function() {
    return this.name;
  };

  model.currentCat = null;
  model.cats = [];
  model.init = function() {
    var self = this;
    var cats = ['jade', 'Udacicat', 'pip', 'stinky', 'derpy'];

    for (var i= 0; i < cats.length; i++) {
      var cat = cats[i];
      var curCat = new Cat(cat);
      self.cats.push(curCat);
    }
  };


  //controller
  controller.init = function() {
    model.init();
    model.currentCat = model.cats[0];
    listView.init();
    catView.init();
  };

  controller.getCurrentCat = function() {
    return model.currentCat;
  };

  controller.getCats = function() {
    return model.cats;
  };

  controller.setCat = function(cat) {
    model.currentCat = cat;
  };

  controller.incrementCount = function() {
    model.currentCat.clickCat();
    catView.render();
  };


  //views
  listView.init = function() {
    var self = this;
    self.catListElm = document.getElementById('cat-list');
    self.render();
  };

  listView.render = function() {
    var self = this;
    var cats = controller.getCats();
    self.catListElm.innerHTML = '';
    var cat, elm, i;
    for (i = 0; i < cats.length; i++) {
      cat = cats[i];

      elm = document.createElement('li');
      elm.textContent = cat.getName();

      elm.addEventListener('click', (function(cat) {
        return function() {
          controller.setCat(cat);
          catView.render();
        };
      })(cat));

      self.catListElm.appendChild(elm);
    }

  };

  catView.init = function() {
    var self = this;

    self.catElm = document.getElementById('cat');
    self.catNameElm = document.getElementById('cat-name');
    self.catCountElm = document.getElementById('cat-count');
    self.catImgElm = document.getElementById('cat-img');

    self.catImgElm.addEventListener('click', function() {
      controller.incrementCount();
    });

    self.render();
  };

  catView.render = function() {
    var self = this;

    var curCat = controller.getCurrentCat();
    self.catCountElm.textContent = curCat.getCount();
    self.catNameElm.textContent = curCat.getName();
    self.catImgElm.src = curCat.getUrl();
  };

  controller.init();

})();