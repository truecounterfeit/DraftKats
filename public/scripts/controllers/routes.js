'use strict';

var app = app || {};

page('/', app.homeController.index);
page('/draft', app.draftController.index);
page('/history', app.historyController.index);
page();