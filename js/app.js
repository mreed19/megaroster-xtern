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
    var span = document.createElement('span');
    span.innerText = studentName;
    span.className = 'studentName';
    li.appendChild(span);
    this.appendLinks(li);
    return li;
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerText = options.text;
    link.onclick = options.handler;
    link.className += (options.className || '');
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
      className: 'promote',
      handler: function() {
        this.promote(li);
      }.bind(this)
    });
    var upLink = this.buildLink({
      text: 'up',
      className: 'up',
      handler: function() {
        this.moveUp(li);
      }.bind(this)
    });
    var downLink = this.buildLink({
      text: 'down',
      className: 'down',
      handler: function() {
        this.moveDown(li);
      }.bind(this)
    });
    span.appendChild(this.buildLink({
      text: 'edit',
      className: 'edit',
      handler: function() {
        this.toggleEditable(li.querySelector('span.studentName'));
      }.bind(this)
    }));
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
  },

  toggleEditable: function(el) {
    var toggleElement = el.parentElement.querySelector('a.edit');
    if (el.contentEditable === 'true') {
      el.contentEditable = 'false';
      toggleElement.innerHTML = 'edit';
    }
    else {
      el.contentEditable = 'true';
      el.focus();
      toggleElement.innerHTML = 'save';
    }
  }
};

megaRoster.init('#studentList');
