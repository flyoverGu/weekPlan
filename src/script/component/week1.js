var debug = require('debug')('week');
var util = require('../util');

module.exports = Vue.extend({
    template: require('../template/week.html'),
    created: function() {
        // init date
        if (!this.plan.date) {
            this.plan.date = util.formatDate(new Date());
        }
    },
    props: {
        plan: Object
    },
    data: function() {
        return {
            currentIndex: -1,
        }
    },
    computed: {
        taskList: function() {
            debug('task list');
            this.selectTask(this.plan.taskList.length - 1);
            return this.plan.taskList
        },
        currentTask: function() {
            debug('change current task');
            if (~this.currentIndex) return this.taskList[this.currentIndex];
            return null;
        },
        projectList: function() {
            return [
                '千牛',
                '店长',
                '绩效',
                '运营',
                '后台',
                '前端',
                '其他'
            ];
        },
        subProject: function() {
            debug('change sub project');
            return map[this.currentTask.project];
        },
    },
    methods: {
        changeProject: function(e) {
            var key = e.target.value;
            this.currentTask.subProject = map[key][0];
        },
        addTask: function() {
            this.taskList.push(buildTask());
            this.selectTask(this.taskList.length - 1);
        },
        deleteTask: function(index) {
            debug('delete task', index);
            this.taskList.splice(index, 1);
            this.selectTask(index - 1);
        },
        selectTask: function(index) {
            debug('selectTask', index);
            this.currentIndex = index;
        },
    }
});

var buildTask = function() {
    return {
        project: '千牛',
        subProject: '超级营销',
        projectType: 'pc',
        task: '',
        status: '进行中',
        comment: ''
    }
}

var map = {
    '千牛': ['超级营销', '超级商品', '超级交易', '超级会员', '超级促销', '超级供销', '超级数据', '基础库'],
    '店长': ['店铺管理', '营销推广', '模板素材', '数据分析', '用户中心', '基础问题', '其他'],
    '绩效': ['绩效主体', '绩效活动', '其他'],
    '运营': ['静态活动', '分销平台', '其他'],
    '后台': ['模板库', '其他'],
    '前端': ['基础库', '框架', '其他'],
    '其他': ['其他']
}
