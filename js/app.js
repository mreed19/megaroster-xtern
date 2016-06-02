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
    var text = document.createTextNode(studentName);
    var removeLink = this.buildLink({
      text: 'remove',
      handler: function() {
        li.remove();
      }
    });
    var editLink = this.buildLink({
      text: 'edit',
      handler: function() {
          var form = document.createElement('form');
          var input = document.createElement('input');
          var change = megaRoster.buildLink({
            text: 'Edit',
            handler: megaRoster.changeName
          });
          var cancel = megaRoster.buildLink({
            text: 'Cancel',
            handler: function() {
              form.remove();
            }
          });
          form.oldStudentName = studentName;
          form.onsubmit = megaRoster.changeName;
          input.type = "text";
          input.name = 'newStudentName';
          change.className = "button";
          cancel.className = "button secondary";
          // li.firstChild.remove();
          form.appendChild(input);
          form.appendChild(change);
          form.appendChild(cancel);
          li.insertBefore(form, li.firstChild.nextElementSibling);
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
        li.parentNode.insertBefore(li, li.previousElementSibling);
      }
    });
    upLink.className = "up";
    var downLink = this.buildLink({
      text: 'down',
      handler: function() {
        li.parentNode.insertBefore(li.nextElementSibling, li);
      }
    });
    downLink.className = "down";
    li.appendChild(text);
    li.appendChild(editLink);
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
  },

  changeName: function(ev) {
    ev.preventDefault();
    var form = ev.currentTarget.nodeName === "A" ? ev.currentTarget.parentNode : ev.currentTarget;
    var textNode = document.createTextNode(form.newStudentName.value);
    form.parentNode.firstChild.remove();
    form.parentNode.insertBefore(textNode, form);
    form.remove();
  }
};

megaRoster.init();
