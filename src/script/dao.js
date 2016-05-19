var debug = require('debug')('dao');
var db = localStorage;

debug('db start');

var vDb = {
    set: function(weekList) {
        try {
            db.planList = JSON.stringify(weekList);
        } catch (e) {
            debug('error: set', e);
        }
    },
    get: function() {
        try {
            return JSON.parse(db.planList);
        } catch(e) {
            debug('error: get', e);
        }
    }
}

module.exports = vDb;
