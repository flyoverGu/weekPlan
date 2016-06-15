var action = require('../../action');
var debug = require('debug')('task');

module.exports = Vue.extend({
    template: require('../../template/task.html'),

    props: {
        task: Object,
        taskIndex: Number,
        date: String
    },

    vuex: {
        actions: {
            _updateTask: action.updateTask,
            _deleteTask: action.deleteTask
        },
    },

    data: function() {
        return {
            projectOptions: projectOptions,
            statusOptions: statusOptions,
            projectTypeOptions: projectTypeOptions,
            isClose: true,
            project: [this.task.project],
            subProject: this.task.subProject,
            projectType: this.task.projectType,
            status: this.task.status,
            title: this.task.task,
            comment: this.task.comment,
            active: false
        }
    },

    computed: {
        subProjectOptions: function() {
            return map[this.project] || [];
        }
    },

    watch: {
        project: function(newV, oldV) {
            var t = map[this.project][0];
            this.subProject = [t];
            this._commonUpdate({
                project: this.project[0]
            });
        },
        title: function() {
            this._commonUpdate({
                task: this.title
            });
        },
        comment: function() {
            this._commonUpdate({
                comment: this.comment
            });
        },
        subProject: function() {
            this._commonUpdate({
                subProject: this.subProject[0]
            });
        },
        projectType: function() {
            this._commonUpdate({
                projectType: this.projectType[0]
            });
        },
        status: function() {
            this._commonUpdate({
                status: this.status[0]
            });
        },
    },

    methods: {
        _commonUpdate: function(newTask) {
            this._updateTask(this.date, this.taskIndex, newTask);
        },
        deleteTask: function() {
            this._deleteTask(this.date, this.taskIndex);
        }
    },

    components: {
        'v-select': require('../../component/select')
    },
});

var projectOptions = [
    '千牛',
    '店长',
    '绩效',
    '运营',
    '后台',
    '前端',
    '其他'
];

var map = {
    '千牛': ['超级营销', '超级商品', '超级交易', '超级会员', '超级促销', '超级供销', '超级数据', '基础库'],
    '店长': ['店铺管理', '营销推广', '模板素材', '数据分析', '用户中心', '基础问题', '其他'],
    '绩效': ['绩效主体', '绩效活动', '其他'],
    '运营': ['静态活动', '分销平台', '其他'],
    '后台': ['模板库', '其他'],
    '前端': ['基础库', '框架', '其他'],
    '其他': ['其他']
};

var projectTypeOptions = [
    'pc',
    '移动'
];

var statusOptions = [
    '进行中',
    '已完成',
    '未开始'
]
