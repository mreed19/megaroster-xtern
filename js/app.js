$(document).foundation();

var megaRoster = {

  init: function() {
    this.setupEventListeners();
    this.count = 0;
  },

  setupEventListeners: function() {
    document.querySelector('form#studentForm').onsubmit = this.addStudent.bind(this);
  },

  addStudent: function(ev) {
    ev.preventDefault();
    var form = ev.currentTarget;
    var studentName = form.studentName.value;
    var listItem = this.buildListItem(studentName);
    var studentList = document.querySelector('#studentList')
    studentList.insertBefore(listItem, studentList.childNodes[0]);
    this.count += 1;
    form.reset();
    form.studentName.focus();
  },

  buildListItem: function(studentName) {
    var li = document.createElement('li');
    var removeLink = this.buildLink({
      text: 'remove',
      handler: function() { li.remove();}
    });
    var promoteLink = this.buildLink('promote');
    li.innerText = studentName;
    li.appendChild(removeLink);
    li.appendChild(promoteLink);
    return li;
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerText = options.text;
    link.onclick = options.handler;
    return link;
  }

  // init: function() {
  //   var myForm = document.querySelector('form');
  //   myForm.onsubmit = this.addNameToDetails;
  // },
  //
  // deleteName: function(ev) {
  //   this.parentNode.remove();
  // },
  //
  // promoteName: function(ev) {
  //   this.parentNode.style.border = '1px solid red';
  // },
  //
  // buildNameItem: function(name) {
  //   var li = document.createElement('li');
  //   li.innerText = name;
  //   li.style.border = '1px solid black';
  //   var deleteButton = document.createElement('button');
  //   deleteButton.onclick = this.deleteName;
  //   deleteButton.innerText = 'Delete';
  //   deleteButton.className = 'button alert';
  //   var promote = document.createElement('button');
  //   promote.onclick = this.promoteName;
  //   promote.innerText = 'Promote';
  //   promote.className = 'button';
  //   li.appendChild(deleteButton);
  //   li.appendChild(promote);
  //   return li;
  // },
  //
  // addNameToDetails: function(ev) {
  //   ev.preventDefault();
  //   var roster = document.querySelector('.roster');
  //   var firstName = this.firstName.value;
  //   roster.insertBefore(app.buildNameItem(firstName), roster.childNodes[0]);
  //   this.reset();
  // }
};

megaRoster.init();
