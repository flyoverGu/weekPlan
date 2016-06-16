var action = require('../../action');
var debug = require('debug')('user');

module.exports = Vue.extend({
    template: require('../../template/user.html'),

    vuex: {
        getters: {
            _name: state => {
                return state.name;
            }
        },
        actions: {
            _updateName: action.updateName
        },
    },

    computed: {
        name: {
            get: function() {
                return this._name
            },
            set: function(newValue) {
                this._updateName(newValue);
            }
        }
    }

});
