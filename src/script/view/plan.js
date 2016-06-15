var debug = require('debug')('plan');
var service = require('../service');

module.exports = Vue.extend({
    template: require('../template/plan.html'),

    created: function() {
        this.initLastPlan();
    },

    data: function() {
        return {
            name: '',
            plan: {
                taskList: []
            },
            last: {
                taskList: []
            },
            currentTab: 'preview_tab'
        }
    },

    computed: {
        jsonWeekPlan: function() {
            return {
                name: this.name,
                date: this.plan.date,
                plan: this.jsonTaskList(this.plan.taskList),
                last: this.jsonTaskList(this.last.taskList)
            }
        },
        stringWeekPlan: function() {
            return JSON.stringify(this.jsonWeekPlan) + ';;';
        },
        htmlWeekPlan: function() {
            debug('html week plan', this.jsonWeekPlan);
            return parseReport(this.jsonWeekPlan);
        }
    },

    watch: {
        plan: {
            handler: function() {
                debug('plan change');
                this.savePlan();
            },
            deep: true
        }
    },

    methods: {
        jsonTaskList: function(taskList) {
            return JSON.parse(JSON.stringify(taskList));
        },
        setName: function() {
            var user = $("#username").val();
            if (!user) {
                alert("姓名不能为空");
                return;
            }
            name = user;
            if (window.sessionStorage) {
                sessionStorage.setItem("username", user);
            }
        },
        savePlan: function() {
            service.savePlan($.extend({}, {
                name: this.name,
                date: this.jsonWeekPlan.date,
                plan: this.jsonWeekPlan.plan
            }));
        },
        initLastPlan: function() {
            this.allPlan = service.getAll();
            debug('init last plan', this.allPlan);
        },
        importLastPlan: function(e) {
            var last = this.allPlan[e.target.value];
            if (last) this.last = $.extend({}, {
                date: last.date,
                taskList: last.plan
            });
            debug('import last plan', this.last, this.allPlan);
        }
    },

    components: {
        week: require('../component/week')
    }
});

