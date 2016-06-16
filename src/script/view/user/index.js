var action = require('../../action');
var debug = require('debug')('user');

module.exports = Vue.extend({
    template: require('../../template/user.html'),

    vuex: {
        getters: {
            _name: state => {
                debug('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', state.name);
                return state.name;
            }
        },
        actions: {
            _updateName: action.updateName
        },
    },

    computed: {
        name: () => this._name,
        //name: {
        //    get: () => {
        //        debug('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', this._name);
        //        return this._name
        //    },
        //    set: newValue => this._updateName(newValue)
        //}
    }

});
