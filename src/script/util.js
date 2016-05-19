module.exports = {
    formatDate: function(curDate) {
        return curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate();
    }
}
