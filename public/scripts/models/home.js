'use strict';

var app = app || {};


(function(module) {
  app.config = {
    "playerData": [], // put API data here
    "selected": "",
    "teams": 5,
    "position" : 1,
    "roster": [
        {"position":"WR", "value": 5},
        {"position":"RB", "value": 3},
        {"position":"QB", "value": 3},
        {"position":"TE", "value": 3},
        {"position":"K", "value": 3},
        {"position":"DEF", "value": 3}
    ],
    "draftOrder": [], // example snake draft
    "teamSelected" : {}
  };

  app.setConfig = function() {
    module.config.selected = $('#dropdown').find(':selected').text();
    module.config.teams = $('#teamCount').find(':selected').text();
    module.config.position = $('#userPos').find(':selected').text();

    // save to local storage when complete
    app.saveConfig([{"teams": app.config.teams, "position": app.config.position, "roster": app.config.roster}]);
  },

  app.getStorage = function() {
    let local = JSON.parse(localStorage.getItem("DraftKats"));
    if (local) {
      $('#teamCount').val(local[0].teams);
      $('#userPos').val(local[0].position);
      $.each(local[0].roster, (index, position) =>{
        $(`#${position.position}`).val(position.value);
      });
    }
  },

  app.saveConfig = function(newConfig) {
    localStorage.setItem("DraftKats", JSON.stringify(newConfig));
  }

  let totalSpots = 0;

  $.each(app.config.roster, (index, spot) => {
    totalSpots += spot.value;
  });

for (var i = 0; i < totalSpots; i++) {
  let localI = i + 1;

  // Check for odd
  if (localI % 2 !== 0) {

    for (var j = 0; j < app.config.teams; j++) {
      let localJ = j + 1;
      app.config.draftOrder.push(localJ);
    }
  } else { // must be even
    for (var k = app.config.teams -1; k >= 0; k--) {
      let localK = k + 1;
      app.config.draftOrder.push(localK);
    };
  }
}

  //api request
  $.get('/api').then(results => {
    $.each(JSON.parse(results)['body']['average_draft_position']['players'], (index, player) => {
      app.config.playerData.push({"name": player.fullname, "bye": parseInt(player.bye_week), "adp":player.rank, "position": player.position, "team": player.pro_team});
    });
  });

  //app.config.roster
  let populateRoster = function() {
    var source   = $("#roster-template").html();
    var template = Handlebars.compile(source);
    var rosterTemplate = template(app.config.roster);

    $('.roster-position').append(rosterTemplate);
    $.each((app.config.roster), function(index, position){
      $(`#${position.position}`).val(`${position.value}`);
    });

  };
  populateRoster();
})(app);
