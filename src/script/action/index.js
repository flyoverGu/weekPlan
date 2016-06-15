module.exports = {
    addWeek: makeAction('addWeek'),
    deleteWeek: makeAction('deleteWeek'),
    addTask: makeAction('addTask'),
    deleteTask: makeAction('deleteTask'),
    updateTask: makeAction('updateTask'),
    updateState: makeAction('updateState')
}

function makeAction(type) {
    return ({
        dispatch
    }, ...args) => dispatch(type, ...args)
}
