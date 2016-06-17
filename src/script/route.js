var VueRouter = require('vue-router')

var Board = require('./view/board');
var Old = require('./view/old');

Vue.use(VueRouter);

var App = Vue.extend({
    store: require('./store'),
    components: {
        user: require('./view/user')
    }
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
