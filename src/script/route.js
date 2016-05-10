var Vue = require('vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter);

var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
})

var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})

var App = Vue.extend({})

var router = new VueRouter()

router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    }
})

router.start(App, '#app')

