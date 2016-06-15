var VueRouter = require('vue-router')

require('./directive');

//var Plan = require('./view/plan');
//var Gather = require('./view/gather');
var Board = require('./view/board');
var Old = require('./view/old');

Vue.use(VueRouter);
//Vue.use(Vuex);

var App = Vue.extend({
    store: require('./store')
})

var router = new VueRouter()

router.map({
    '/board': {
        component: Board
    },
    '/old': {
        component: Old
    }
})

router.start(App, '#app');
