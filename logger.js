var url = 'http://mylogger.io/log';

function log(message) {
    // send an HTTP request
    return "Hello, " + message
}

// module.exports.log = log;
// module.exports.url = url;
// we create and variable of function with and name but exported
// with defirend name
// module.exports.endPont = url;

// to export log as a method
module.exports = log;