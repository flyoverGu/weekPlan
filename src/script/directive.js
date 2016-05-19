var debug = require('debug')('directive');

Vue.directive('diy', function(value) {
    debug('do diy directive', value);
    if (value) this.el.setAttribute('selected', 'selected');
});
