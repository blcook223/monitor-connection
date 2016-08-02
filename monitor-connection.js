var fs = require('fs');
var moment = require('moment');
var ping = require('ping');

var outage = false;

fs.appendFile('./network.log', 'Monitoring started at ' + moment().format('MMMM Do YYYY, h:mm:ss a') + '\n');

setInterval(function () {
    ping.sys.probe('8.8.8.8', function(isAlive){
        if (!outage && !isAlive) {
            outage = true;
            fs.appendFile('./network.log', 'Network outage at ' + moment().format('MMMM Do YYYY, h:mm:ss a') + '\n');
        } else if (outage && isAlive) {
            outage = false;
            fs.appendFile('./network.log', 'Network restored at ' + moment().format('MMMM Do YYYY, h:mm:ss a') + '\n');
        }
    });
}, 5000);
