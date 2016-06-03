$(document).foundation();

var megaRoster = {

  init: function(listSelector) {
    this.setupEventListeners();
    this.count = 0;
    this.studentList = document.querySelector(listSelector);
  },

  setupEventListeners: function() {
    document.querySelector('form#studentForm').onsubmit = this.addStudent.bind(this);
  },

  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  },

  addStudent: function(ev) {
    ev.preventDefault();
    var form = ev.currentTarget;
    var studentName = form.studentName.value;
    var listItem = this.buildListItem(studentName);
    this.prependChild(this.studentList, listItem);
    this.count += 1;
    form.reset();
    form.studentName.focus();
  },

  buildListItem: function(studentName) {
    var li = document.createElement('li');
    li.innerText = studentName;
    this.appendLinks(li);
    return li;
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerText = options.text;
    link.onclick = options.handler;
    return link;
  },

  appendLinks: function(li) {
    var span = document.createElement('span');
    span.className += 'actions';
    var removeLink = this.buildLink({
      text: 'remove',
      handler: function() {
        li.remove();
      }
    });
    var promoteLink = this.buildLink({
      text: 'promote',
      handler: function() {
        this.promote(li);
      }.bind(this)
    });
    var upLink = this.buildLink({
      text: 'up',
      handler: function() {
        this.moveUp(li);
      }.bind(this)
    });
    var downLink = this.buildLink({
      text: 'down',
      handler: function() {
        this.moveDown(li);
      }.bind(this)
    });
    promoteLink.className += 'promote';
    upLink.className += 'up';
    downLink.className += 'down';
    span.appendChild(removeLink);
    span.appendChild(promoteLink);
    span.appendChild(upLink);
    span.appendChild(downLink);
    li.appendChild(span);
  },

  promote: function(li) {
    this.prependChild(this.studentList, li);
  },

  moveUp: function(li) {
    this.studentList.insertBefore(li, li.previousElementSibling);
  },

  moveDown: function(li) {
    this.studentList.insertBefore(li.nextElementSibling, li);
  }
};

megaRoster.init('#studentList');
