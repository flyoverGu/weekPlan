var Vue = require('vue')
var VueRouter = require('vue-router')
window.Vue = Vue;

require('./directive');

var Plan = require('./view/plan');
//var Gather = require('./view/gather');

Vue.use(VueRouter);

var App = Vue.extend({})

var router = new VueRouter()

router.map({
    '/week': {
        component: Plan
    },
    //'/gather': {
    //    component: Gather
    //}
})

router.start(App, '#app')

