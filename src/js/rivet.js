"use strict";

var config = require('./config');
var cell = require('./cell');

var rivetViewModel = function(){
    var self = this;

    self.isLoaded = false;
    self.horizontal = [];
    self.vertical = [];

    self.load = function(){
        self.isLoaded = true;
        self.horizontal = [];
        self.vertical = [];

        for (var i = 0; i < config.dimension.y(); i++) {
            var row = new rowViewModel();
            row.index = (i + 1).toString();

            for (var j = 0; j < config.dimension.x(); j++) {
                row.row.push(new cellViewModel());
            }

            self.horizontal.push(row);
        }

        for (var k = 0; k < config.dimension.x(); k++) {
            self.vertical.push(k + 1);
        }
    };

    self.triggerAll = function(){
        self.horizontal.forEach(function(row){
            row.row.forEach(function(cell){
                cell.trigger();
            })
        })
    };

    self.clear = function(){
        self.horizontal = [];
        self.vertical = [];
        self.isLoaded = false;
    };
};

var rowViewModel = function () {
    var self = this;
    self.row = [];
    self.index = 0;
};

var cellViewModel = function () {
    var self = this;

    self.isTriggered = false;

    self.getText = function(){
        return self.isTriggered ? "1" : "0";
    };

    self.getBgColor = function(){
        return self.isTriggered ? "CCFFFF" : "FFFFFF";
    };

    self.trigger = function () {
        setTimeout(function () {
            self.isTriggered  = true;
        }, cell.generateRandomTimeout());
    };
};

rivets.bind(document.getElementById('rivet'), new rivetViewModel());