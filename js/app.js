$(document).foundation();

var app = {

  init: function() {
    var myForm = document.querySelector('form');
    myForm.onsubmit = this.addNameToDetails;
  },

  deleteName: function(ev) {
    this.parentNode.remove();
  },

  promoteName: function(ev) {
    this.parentNode.style.border = '1px solid red';
  },

  buildNameItem: function(name) {
    var li = document.createElement('li');
    li.innerText = name;
    li.style.border = '1px solid black';
    var deleteButton = document.createElement('button');
    deleteButton.onclick = this.deleteName;
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'button alert';
    var promote = document.createElement('button');
    promote.onclick = this.promoteName;
    promote.innerText = 'Promote';
    promote.className = 'button';
    li.appendChild(deleteButton);
    li.appendChild(promote);
    return li;
  },

  addNameToDetails: function(ev) {
    ev.preventDefault();
    var roster = document.querySelector('.roster');
    var firstName = this.firstName.value;
    roster.insertBefore(app.buildNameItem(firstName), roster.childNodes[0]);
    this.reset();
  }
};

app.init();
