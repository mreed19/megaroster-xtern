$.extend(megaRoster, {
  setupAllMutantsAjax: function() {
    $('a[data-remote="true"]').on('click', function(ev) {
      ev.preventDefault();
      $.ajax({
        url: $(ev.currentTarget).attr('href'),
        method: 'get',
        success: function(data) {
          this.loadMutants(data);
        }.bind(this)
      })
    }.bind (megaRoster));
  },

  loadMutants: function(data) {
    $.each(data, function(i, mutant) {
      megaRoster.prependChild(megaRoster.studentList, megaRoster.buildListItem({
        studentName: '<i class="fa fa-android"></i>' + mutant.mutant_name + '[' + mutant.real_name + '](' + mutant.power + ')',
        favorited: false
      }));
    }.bind(this));
  },

  setupClearAjax: function() {
    $('#clear').on('click', function(ev) {
      ev.preventDefault();
      localStorage.clear();
      this.studentList.empty();
    }.bind(this));
  }
});
