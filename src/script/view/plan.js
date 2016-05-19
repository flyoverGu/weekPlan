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

/**
 * 报表对象解析成报表
 * @param reportOjb 报表对象
 * return 报表html
 */

function parseReport(reportObj) {
    var hl = "",
        i, j, obj, head,
        comTdCss = 'border: solid 1px #DDD;background-color: #F7F7F7;padding: 4px 12px;font-family: monospace;font-size: 12px;',
        tableSty = ' style="margin: 15px;width: 765px;border-collapse:collapse;border-spacing: 0; text-align: left;" ',
        h2Sty = ' style="color:#888;text-align: left;font-size: 16px;padding: 5px 15px 0 15px;margin:0;" ',
        firstTrTdSty = ' style="text-align: center;background-color: #999;color: #FFF;border: solid 1px #DDD;font-weight: normal;font-family: \'Microsoft YaHei\', \'WenQuanYi Micro Hei\', \'tohoma,sans-serif\';" ',
        tdComSty = ' style="min-width: 40px;text-align:center;color: #888;' + comTdCss + '" ',
        tdComLeftSty = ' style="min-width: 40px;text-align:left;color: #888;' + comTdCss + '" ',
        tdComCenSty = ' style="min-width: 60px;text-align: center;color: #888;' + comTdCss + '" ',
        tdFirstSty = ' style="min-width: 40px;text-align:center;color:#258AAF;' + comTdCss + '" ';

    head = '<table ' + tableSty + '>' + '<tr>' + '<td ' + firstTrTdSty + '>平台</td>' + '<td ' + firstTrTdSty + '>项目</td>' + '<td ' + firstTrTdSty + '>类型</td>' + '<td ' + firstTrTdSty + '>任务</td>' + '<td ' + firstTrTdSty + '>状态</td>' + '<td ' + firstTrTdSty + '>备注</td>' + '</tr>';

    if (reportObj.last.length) {
        hl = '<h2 ' + h2Sty + '>上周工作：</h2>' + head;
        for (i = 0, j = reportObj.last.length; i < j; i++) {
            obj = reportObj.last[i]
            hl += '<tr>' + '<td ' + tdFirstSty + '>' + obj.project + '</td>' + '<td ' + tdComCenSty + '>' + obj.subProject + '</td>' + '<td ' + tdComSty + '>' + obj.projectType + '</td>' + '<td ' + tdComLeftSty + '>' + obj.task + '</td>' + '<td ' + tdComSty + '>' + obj.status + '</td>' + '<td ' + tdComLeftSty + '>' + obj.comment + '</td>' + '</tr>';
        }

        hl += '</table>';
    };

    if (reportObj.plan.length) {
        hl += '<h2 ' + h2Sty + '>本周计划：</h2>' + head;

        for (i = 0, j = reportObj.plan.length; i < j; i++) {
            obj = reportObj.plan[i]
            hl += '<tr>' + '<td ' + tdFirstSty + '>' + obj.project + '</td>' + '<td ' + tdComCenSty + '>' + obj.subProject + '</td>' + '<td ' + tdComSty + '>' + obj.projectType + '</td>' + '<td ' + tdComLeftSty + '>' + obj.task + '</td>' + '<td ' + tdComSty + '>' + obj.status + '</td>' + '<td ' + tdComLeftSty + '>' + obj.comment + '</td>' + '</tr>';
        }

        hl += '</table>';
    };

    return hl;
}
