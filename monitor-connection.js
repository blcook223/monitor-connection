var fs = require('fs');
var moment = require('moment');
var ping = require('ping');

var outage = false;

setInterval(function () {
    ping.sys.probe('8.8.8.8', function(isAlive){
        if (!outage && !isAlive) {
            outage = true;
            fs.appendFile('./network.log', 'Network outage at ', moment().format('MMMM Do YYYY, h:mm:ss a'));
        } else if (outage && isAlive) {
            outage = false;
            fs.appendFile('./network.log', 'Network restored at ', moment().format('MMMM Do YYYY, h:mm:ss a'));
        }
    });
}, 5000);
