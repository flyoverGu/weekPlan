var action = require('../../action');
var util = require('../../util');
var debug = require('debug')('board');

module.exports = Vue.extend({
    template: require('../../template/board.html'),

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

    computed: {
        count: function() {
            return this.weekList.length;
        }
    },

    components: {
        week: require('../week/week'),
    },

    watch: {
        count: function(newValue, oldValue) {
            debug('weekList count change', oldValue, newValue);
            if (oldValue < newValue) {
                this.scrollOver();
            }
        }
    },

    methods: {
        scrollOver: function() {
            // 默认滚到底
            this.$el.firstElementChild.scrollLeft = 10000;
        },
        addWeek: function() {
            var today = util.formatDate(new Date);
            for (var i = 0; i < this.weekList.length; i++) {
                if (this.weekList[i].date == today) {
                    alert(today + '的计划已经存在');
                    return;
                }
            }
            this._addWeek();
        },
    },

    ready: function() {
        this.scrollOver();
    },
});
