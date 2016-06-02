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
    var removeLink = this.buildLink({
      text: 'remove',
      handler: function() {
        li.remove();
      }
    });
    var promoteLink = this.buildLink({
      text: 'promote',
      handler: function() {
        li.style.border = '2px CornflowerBlue dashed';
      }
    });
    var upLink = this.buildLink({
      text: 'up',
      handler: function() {
        if (li.previousElementSibling !== null) {
          li.parentNode.insertBefore(li, li.previousElementSibling);
        }
      }
    });
    upLink.className = "up";
    var downLink = this.buildLink({
      text: 'down',
      handler: function() {
        // debugger;
        if (li.nextElementSibling !== null) {
          li.parentNode.insertBefore(li.nextElementSibling, li);
        }
      }
    });
    downLink.className = "down";
    li.innerText = studentName;
    li.appendChild(removeLink);
    li.appendChild(promoteLink);
    li.appendChild(upLink);
    li.appendChild(downLink);
    return li;
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerText = options.text;
    link.onclick = options.handler;
    return link;
  }
};

megaRoster.init();
