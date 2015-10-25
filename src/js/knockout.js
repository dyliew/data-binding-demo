"use strict";

var config = require('./config');
var cell = require('./cell');

var koViewModel = function () {
    var self = this;
    self.horizontal = ko.observableArray([]);
    self.vertical = ko.observableArray([]);

    self.load = function () {
        self.horizontal([]);
        self.vertical([]);

        for (var i = 0; i < config.dimension.y(); i++) {
            var row = new rowViewModel();

            for (var j = 0; j < config.dimension.x(); j++) {
                row.row.push(new cellViewModel());
            }

            self.horizontal.push(row);
        }

        for (var j = 0; j < config.dimension.x(); j++) {
            self.vertical.push(j);
        }
    };

    self.triggerAll = function () {
        self.horizontal().forEach(function(row){
            row.row().forEach(function(cell){
                cell.trigger();
            })
        })
    };

    self.clear = function () {
        self.horizontal([]);
    }
};

var rowViewModel = function () {
    var self = this;
    self.row = ko.observableArray([]);
};

var cellViewModel = function () {
    var self = this;

    self.isTriggered = ko.observable(false);

    self.text = ko.computed(function () {
        return self.isTriggered() ? "1" : "0";
    });

    self.trigger = function () {
        setTimeout(function () {
            self.isTriggered(true);

        }, cell.generateRandomTimeout());
    }
};

ko.applyBindings(new koViewModel(), document.getElementById('knockout'));