var debug = require('debug')('service');

var db = require('./dao');
var util = require('./util');

module.exports = {
    savePlan: function(plan) {
        var all = module.exports.getAll();
        all[plan.date] = plan;
        debug(all);
        db.set(all);
    },
    getLast: function() {
        var all = module.exports.getAll();
        var keys = formarDay();
        var last = null;
        keys.forEach(function(key) {
            if (all[key] && !last) last = all[key];
        });
        return last;
    },
    getAll: function() {
        return db.get() || {};
    }
}

var formarDay = function() {
    var count = 10;
    var index = 0;
    var time = new Date().getTime();
    var dayTime = 1000 * 60 * 60 * 24;
    var keys = [];
    while (index < count) {
        keys.push(util.formatDate(new Date(time - index * dayTime)));
        index++;
    }
    debug('formar days ', keys);
    return keys;
}
