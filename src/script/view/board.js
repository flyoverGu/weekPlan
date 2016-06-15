var action = require('../action');
var util = require('../util');

module.exports = Vue.extend({
    template: require('../template/board.html'),

    vuex: {
        actions: {
            _addWeek: action.addWeek
        },
        getters: {
            weekList: function(state) {
                return state.weekList;
            }
        }
    },

    components: {
        week: require('./week/week'),
    },

    methods: {
        addWeek: function() {
            var today = util.formatDate(new Date);
            for (var i = 0; i < this.weekList.length; i++) {
                if (this.weekList[i].date == today) {
                    alert(today + '的计划已经存在');
                    return ;
                }
            }
            this._addWeek();
        }
    }
});
