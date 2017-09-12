'use strict';

var app = app || {};
console.log();
(function(module) {
  let populateDraft = function() {
    $.get(`/scripts/draft.hbs`, (source) => {
      //var source   = $.get(`scripts/draft.hbs`);
      console.log('draft source ' + source);
      var template = Handlebars.compile(source);
      //Handlebars.compile(source);
      for (var i = 0; i < 10; i++) {
      $('#content-draft').append(template);
      }
    });
  populateDraft();

  $('.teams-tab').hide();
    $('#draft-nav').on('click', function(event){
      $(`.${event.target.id}-tab`).show().siblings().not('#draft-nav').hide();
    });
  };
})(app);
