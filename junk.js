/**
 *
 * Created by githop on 6/9/15.
 */


Cat.prototype.wireUpCat = function() {
  var self = this;

  //create cat-div
  var catDiv = document.createElement('div');
  var catName = document.createElement('h3');
  var ccLabel = document.createElement('span');
  var clickCount = document.createElement('strong');
  clickCount.id = "ccId" + self.getId();
  var catPic = document.createElement('img');

  //initialize
  catDiv.appendChild(catName);
  catDiv.appendChild(clickCount);

  clickCount.innerHTML = "Count: " + self.getCount();

  //cat properties
  catName.innerHTML = self.getName();
  catPic.src = self.getUrl();
  catPic.id = self.getId();
  catPic.width = 160;

  //append img
  catDiv.appendChild(catPic);
  //setup listeners
  catPic.addEventListener('click', (function(catCop){
    catCop.clickCat();
    //clickCount.innerHTML = "Count: " + self.getCount();
  })(self));

  //swap out kitty for selected
  catDetail.innerHTML = catDiv.innerHTML;
};

function CatHerder(catsArr) {
  this.cats = catsArr;
}

CatHerder.prototype.getById = function(id) {
  return this.cats[id];
};


CatHerder.prototype.selectCat = function(id) {
  var self = this;
  var selectedCat = self.getById(id);
  selectedCat.wireUpCat();
};
CatHerder.prototype.setupList = function() {
  var self = this;
  var catList = document.createElement('ul');

  for (var i = 0; i < self.cats.length; i++) {
    var cat = self.getById(i);
    var li = document.createElement('li');
    var a = document.createElement('a');
    var linkText = document.createTextNode( cat.getName() );

    a.appendChild(linkText);
    a.href = '#';
    li.appendChild(a);
    catList.appendChild(li);

    li.addEventListener('click', (function(catCop){
      return function() {
        catCop.wireUpCat();
      }
    })(cat));
  }
  catWrapperDiv.appendChild(catList);
};


function setupDom() {
  catWrapperDiv = document.getElementById('cat-wrap');
  catDetail.id = 'cat-detail';
  catWrapperDiv.appendChild(catDetail);

}

function setupCatObjs() {
  var cats = ['jade', 'Udacicat', 'pip', 'stinky', 'derpy'];
  var catsList = [];

  for (var i= 0; i < cats.length; i++) {
    var cat = cats[i];
    var curCat = new Cat(cat, i);
    //curCat.wireUpCat();
    catsList.push(curCat);
  }

  var catManager = new CatHerder(catsList);

  catManager.setupList();
}

setupDom();
setupCatObjs();