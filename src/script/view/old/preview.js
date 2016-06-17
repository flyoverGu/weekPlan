var action = require('../../action');
var debug = require('debug')('preview');

module.exports = Vue.extend({
    template: require('../../template/preview.html'),

    vuex: {
        getters: {
            weekList: state => state.weekList,
            name: state => state.name
        },
        actions: {
            _updateState: action.updateState
        }
    },

    data: function() {
        return {
            newCode: ''
        }
    },

    computed: {
        state: function() {
            if (!this.name) alert('请在右上角处填写名字');
            return {
                name: this.name,
                weekList: this.weekList
            }
        },
        code: {
            get: function() {
                return JSON.stringify(transformToOld(this.state)) + ';;;';
            },
            set: function(value) {
                this.newCode = value;
            }
        },
        html: function() {
            return parseReport(transformToOld(this.state));
        }
    },

    methods: {
        importData: function() {
            this._updateState(transformToNew(this.newCode));
        }
    },
});

var transformToNew = function(data) {
    var json = JSON.parse(data.replace(';;', '')) || {};
    var name = json.name;
    var date = json.date;
    var taskList = json.plan;
    return {
        name: name,
        weekList: [{
            date: date,
            taskList: taskList
        }]
    }
}

var transformToOld = function(data) {
    var json = JSON.parse(JSON.stringify(data)) || {};
    var name = json.name;
    var _len = json.weekList.length;
    var plan = json.weekList[_len - 1];
    var last = json.weekList[_len - 2];
    var date = plan.date;
    return {
        name: name,
        date: date,
        last: last && last.taskList || [],
        plan: plan && plan.taskList || []
    }
}

/**
 * 报表对象解析成报表
 * @param reportOjb 报表对象
 * return 报表html
 */
var parseReport = function(reportObj) {
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
