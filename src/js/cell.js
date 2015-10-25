var config = require('./config');

module.exports.generateRandomTimeout = function(){
    var duration = document.getElementById('durationInput').value || config.duration;

    return ((Math.random() * duration) + 0.1) * 1000;
};