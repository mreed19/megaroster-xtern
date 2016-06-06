$(document).foundation();

var megaRoster = {

  init: function(listSelector) {
    this.setupEventListeners();
    this.count = 0;
    this.studentList = document.querySelector(listSelector);
    this.roster = [];
    this.load();
  },

  load: function() {
    var loadList = localStorage.getItem('roster');
    if (loadList !== null) {
      var listObjects = JSON.parse(loadList);
      while (listObjects.length !== 0) {
        this.prependChild(this.studentList, this.buildListItem(listObjects.pop()));
      }
    }
  },

  save: function() {
    localStorage.setItem('roster', JSON.stringify(this.roster));
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
    var listItem = this.buildListItem({
      studentName: form.studentName.value,
      favorited: false
    });
    this.prependChild(this.studentList, listItem);
    form.reset();
    form.studentName.focus();
  },

  buildListItem: function(student) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    li.dataset.id = this.count;
    this.roster.unshift(student);
    span.innerHTML = student.studentName;
    span.className = 'studentName';
    if (student.favorited) {
      li.style.backgroundColor = 'Gold';
    }
    li.appendChild(span);
    this.appendLinks(li);
    this.count += 1;
    this.save();
    return li;
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerHTML = options.contents;
    link.onclick = options.handler;
    link.className += (options.className || '');
    return link;
  },

  appendLinks: function(li) {
    var span = document.createElement('span');
    span.className += 'actions';
    var removeLink = this.buildLink({
      contents: '<i class="fa fa-trash"></i>',
      className: 'remove',
      handler: function() {
        this.remove(li);
      }.bind(this)
    });
    var promoteLink = this.buildLink({
      contents: 'promote',
      className: 'promote',
      handler: function() {
        this.promote(li);
      }.bind(this)
    });
    var upLink = this.buildLink({
      contents: '<i class="fa fa-arrow-up"></i>',
      className: 'up',
      handler: function() {
        this.moveUp(li);
      }.bind(this)
    });
    var downLink = this.buildLink({
      contents: '<i class="fa fa-arrow-down"></i>',
      className: 'down',
      handler: function() {
        this.moveDown(li);
      }.bind(this)
    });
    span.appendChild(this.buildLink({
      contents: '<i class="fa fa-pencil"></i>',
      className: 'edit',
      handler: function() {
        this.toggleEditable(li.querySelector('span.studentName'));
      }.bind(this)
    }));
    span.appendChild(this.buildLink({
      contents: '<i class="fa fa-star"></i>',
      className: 'favorite',
      handler:function() {
        this.favorite(li);
      }.bind(this)
    }))
    span.appendChild(removeLink);
    span.appendChild(promoteLink);
    span.appendChild(upLink);
    span.appendChild(downLink);
    li.appendChild(span);
  },

  remove: function(li) {
    this.roster.splice(this.count - li.dataset.id - 1, 1);
    this.count -= 1;
    this.orderIds({
      id: this.count - 1,
      li: li
    });
    li.remove();
    this.save();
  },

  promote: function(li) {
    var promoted = this.roster.splice(this.count - li.dataset.id - 1, 1);
    this.roster.unshift(promoted[0]);
    this.orderIds({
      id: this.count - 2,
      li: li,
    });
    li.dataset.id = this.count - 1;
    this.prependChild(this.studentList, li);
    this.save();
  },

  moveUp: function(li) {
    var temp = this.roster[this.count - li.dataset.id - 1];
    this.roster[this.count - li.dataset.id - 1] = this.roster[this.count - li.dataset.id - 2];
    this.roster[this.count - li.dataset.id - 2] = temp;
    li.dataset.id++;
    li.previousElementSibling.dataset.id--;
    this.save();
    this.studentList.insertBefore(li, li.previousElementSibling);
  },

  moveDown: function(li) {
    var temp = this.roster[this.count - li.dataset.id - 1];
    this.roster[this.count - li.dataset.id - 1] = this.roster[this.count - li.dataset.id];
    this.roster[this.count - li.dataset.id] = temp;
    li.dataset.id--;
    li.nextElementSibling.dataset.id++;
    this.save();
    this.studentList.insertBefore(li.nextElementSibling, li);
  },

  toggleEditable: function(el) {
    var toggleElement = el.parentElement.querySelector('a.edit');
    if (el.contentEditable === 'true') {
      el.contentEditable = 'false';
      toggleElement.innerHTML = 'edit';
      this.roster[this.count - el.parentNode.dataset.id - 1].studentName = el.innerText;
      this.save();
    }
    else {
      el.contentEditable = 'true';
      el.focus();
      toggleElement.innerHTML = 'save';
    }
  },

  favorite: function(li) {
    if (this.roster[this.count - li.dataset.id - 1].favorited) {
      li.style.backgroundColor = '';
      this.roster[this.count - li.dataset.id - 1].favorited = false;
    }
    else {
      li.style.backgroundColor = 'Gold';
      this.roster[this.count - li.dataset.id - 1].favorited = true;
    }
    this.save();
  },

  orderIds: function(options) {
    var current = options.li.parentNode.firstChild;
    while (options.id != options.li.dataset.id - 1) {
      current.dataset.id = options.id;
      options.id--;
      current = current.nextElementSibling;
    }
  }
};

megaRoster.init('#studentList');
$('a[data-remote="true"]').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'get',
    success: loadMutants
  });
});

function loadMutants(data) {
  $.each(data, function(i, mutant) {
    megaRoster.prependChild(megaRoster.studentList, megaRoster.buildListItem({
      studentName: '<i class="fa fa-android"></i>' + mutant.mutant_name + '[' + mutant.real_name + '](' + mutant.power + ')',
      favorited: true
    }));
  });
}
