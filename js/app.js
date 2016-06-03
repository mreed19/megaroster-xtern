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
    studentList.insertBefore(listItem, studentList.firstChild);
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
    var removeLink = this.buildLink({
      text: 'remove',
      handler: function() {
        li.remove();
      }
    });
    var promoteLink = this.buildLink({
      text: 'promote',
      handler: function() {
        li.style.border = '2px dashed CornflowerBlue';
      }
    });
    span.appendChild(removeLink);
    span.appendChild(promoteLink);
    li.appendChild(span);
  },

  changeName: function(ev) {
    ev.preventDefault();
    var form = ev.currentTarget.nodeName === "A" ? ev.currentTarget.parentNode : ev.currentTarget;
    var textNode = document.createTextNode(form.newStudentName.value);
    form.parentNode.firstChild.remove();
    form.parentNode.insertBefore(textNode, form);
    form.remove();
  },

};

megaRoster.init();
