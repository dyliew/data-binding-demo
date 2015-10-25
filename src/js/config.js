"use strict";

var config = {
    dimension: {
        x: function(){
            return document.getElementById('numberOfRowInput').value || 150;
        },
        y: function(){
            return document.getElementById('numberOfColumnInput').value || 50;
        }
    },
    duration: 5
};

module.exports = config;