//return to work:
//https://www.udacity.com/course/viewer#!/c-ud989/l-3437288625/m-3530929039

(function(){
  var model = {};
  var controller = {};
  var listView = {};
  var catView = {};
  var adminView = {};

  //Classes
  function Cat(name, url, cc) {
    this.name = name;
    this.pic = url;
    this.clickCount = cc || 0;
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

  Cat.prototype.setCount = function(val) {
    this.clickCount = val;
  };

  Cat.prototype.getUrl = function() {
    return this.pic;
  };

  Cat.prototype.setUrl = function(val) {
    this.pic = val;
  };

  Cat.prototype.getName = function() {
    return this.name;
  };

  Cat.prototype.setName = function(val) {
    this.name = val;
  };

  Cat.prototype.update = function(cat) {
    this.setName(cat.getName());
    this.setUrl(cat.getUrl());
    this.setCount(cat.getCount());
  };

  model.currentCat = null;
  model.cats = [];
  model.init = function() {
    var self = this;
    var cats = ['jade', 'Udacicat', 'pip', 'stinky', 'derpy'];
    var urls = ['http://i.imgur.com/HGaRLlo.jpg',
                'http://i.imgur.com/5jbn9cr.jpg',
                'http://i.imgur.com/3Sc3lbf.png',
                'http://i.imgur.com/HcNWLsN.jpg',
                'http://i.imgur.com/X57Hi5F.jpg'];

    for (var i= 0; i < cats.length; i++) {
      var catName = cats[i];
      var url = urls.pop();
      var curCat = new Cat(catName, url);
      self.cats.push(curCat);
    }
  };


  //controller
  controller.init = function() {
    model.init();
    model.currentCat = model.cats[0];
    listView.init();
    catView.init();
    adminView.init();
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

  controller.saveCat = function(name, url, cc) {
    var curCat = model.currentCat;
    console.log("url in savecat", url);
    var domCat = new Cat(name, url, cc);
    curCat.update(domCat);

    catView.render();
    listView.render();
    adminView.reset();
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
          adminView.reset();
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
    self.catImgElm.width = 256;
    self.catCountElm.innerHTML = 'click count: 0';

    self.catImgElm.addEventListener('click', function() {
      controller.incrementCount();
    });

    self.render();
  };

  catView.render = function() {
    var self = this;

    var curCat = controller.getCurrentCat();
    self.catCountElm.textContent = 'click count: ' + curCat.getCount();
    self.catNameElm.textContent = curCat.getName();
    self.catImgElm.src = curCat.getUrl();
  };

  adminView.init = function() {
    var self = this;
    self.adminDiv = document.getElementById('admin');
    self.nameInput = document.getElementById('name-edit');
    self.urlInput = document.getElementById('url-edit');
    self.ccInput = document.getElementById('cc-edit');
    self.adminBtn = document.getElementById('show-admin');
    self.saveBtn = document.getElementById('save');
    self.cancelBtn = document.getElementById('cancel');

    self.adminDiv.style.display = 'none';

    self.adminBtn.addEventListener('click', function(){
      self.render();
    });

    self.saveBtn.addEventListener('click', function(){
      self.save();
    });

    self.cancelBtn.addEventListener('click', function(){
      self.cancel();
    });
  };

  adminView.render = function() {
    var self = this;

    self.adminDiv.style.display = '';
    var curCat = controller.getCurrentCat();

    self.nameInput.value = curCat.getName();
    self.urlInput.value = curCat.getUrl();
    self.ccInput.value = curCat.getCount();
  };

  adminView.reset = function() {
    this.adminDiv.style.display = 'none';
  };

  adminView.save = function() {
    var self = this;
    var domName = self.nameInput.value,
        domUrl = self.urlInput.value,
        domCC = self.ccInput.value;

    controller.saveCat(domName, domUrl, domCC);
  };

  adminView.cancel = function() {
    this.reset();
  };

  controller.init();

})();