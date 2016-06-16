module.exports = {
    addWeek: makeAction('addWeek'),
    deleteWeek: makeAction('deleteWeek'),
    addTask: makeAction('addTask'),
    deleteTask: makeAction('deleteTask'),
    updateTask: makeAction('updateTask'),
    updateState: makeAction('updateState'),
    updateName: makeAction('updateName')
}

function makeAction(type) {
    return ({
        dispatch
    }, ...args) => dispatch(type, ...args)
}
