var action = require('../../action');

module.exports = Vue.extend({
    template: require('../../template/week.html'),

    props: {
        week: Object
    },

    vuex: {
        actions: {
            _addTask: action.addTask,
            _deleteWeek: action.deleteWeek
        },
        getters: {
            weekList: function(state) {
                return state.weekList;
            }
        }
    },

    data: function() {
        return {
            active: false
        }
    },

    watch: {
        week: function() {
            console.log(this.week.toJSON());
        }
    },

    components: {
        task: require('./task')
    },

    methods: {
        addTask: function() {
            this._addTask(this.week.date);
        },
        deleteWeek: function() {
            this._deleteWeek(this.week.date);
        }
    }
});
