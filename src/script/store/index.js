var util = require('../util');
var debug = require('debug')('store');


var saveLocal = function() {
    window.localStorage.plan = JSON.stringify(state);
}

var dumpLocal = function() {
    return window.localStorage.plan && JSON.parse(window.localStorage.plan);
}

var state = dumpLocal() || {
    name: '',
    weekList: []
}

var mutations = {
    addWeek: function(state) {
        var newWeek = createWeek();
        state.weekList.push(newWeek);
        saveLocal();
    },
    deleteWeek: function(state, date) {
        var index = findWeek(date);
        state.weekList.splice(index, 1);
        saveLocal();
    },
    addTask: function(state, date) {
        var index = findWeek(date);
        closeAllTask(state, index);
        state.weekList[index].taskList.push(createTask());
        saveLocal();
    },
    deleteTask: function(state, date, taskIndex) {
        var index = findWeek(date);
        state.weekList[index].taskList.splice(taskIndex, 1);
        saveLocal();
    },
    updateTask: function(state, date, taskIndex, newTask) {
        debug(newTask);
        var index = findWeek(date);
        for (var key in newTask) {
            state.weekList[index].taskList[taskIndex][key] = newTask[key];
        }
        saveLocal();
    },
    updateName: function(state, name) {
        state.name = name;
        saveLocal();
    },
    updateState: function(state, newState) {
        debug(JSON.stringify(newState));
        state.name = newState.name;
        state.weekList = newState.weekList;
        saveLocal();
    },
    updateClose: function(state, date, taskIndex, isClose) {
        debug('isClose', isClose);
        var index = findWeek(date);
        if (!isClose) {
            closeAllTask(state, index);
        }
        state.weekList[index].taskList[taskIndex]['isClose'] = isClose;
        saveLocal();
    },
}

var closeAllTask = function(state, index) {
    var taskList = state.weekList[index].taskList;
    debug(taskList);
    for (var i = 0; i < taskList.length; i++) {
        taskList[i].isClose = true;
    }
}


var findWeek = function(date) {
    var index = -1;
    for (var i = 0; i < state.weekList.length; i++) {
        if (state.weekList[i].date == date) index = i;
    }
    return index;
}

var createWeek = function() {
    return {
        date: util.formatDate(new Date),
        taskList: []
    }
}

var createTask = function() {
    return {
        project: '千牛',
        subProject: '超级营销',
        projectType: 'pc',
        task: '',
        status: '进行中',
        comment: '',
        isClose: false
    }
}

module.exports = new Vuex.Store({
    state: state,
    mutations: mutations
});
