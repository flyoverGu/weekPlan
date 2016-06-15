module.exports = Vue.extend({
    template: require('./t.html'),

    props: {
        options: {
            type: Array,
            default () {
                return []
            },
        },
        value: {
            twoWay: true
        },
        placeholder: {
            type: String,
            default: 'Nothing Selected'
        },
        multiple: {
            type: Boolean,
            coerce: coerceBoolean,
            default: false
        },
        search: { // Allow searching (only works when options are provided)
            type: Boolean,
            coerce: coerceBoolean,
            default: false
        },
        limit: {
            type: Number,
            default: 1024
        },
        closeOnSelect: { // only works when multiple==false
            type: Boolean,
            coerce: coerceBoolean,
            default: false
        },
        disabled: {
            type: Boolean,
            coerce: coerceBoolean,
            default: false
        }
    },
    ready: function() {
        if (this.value.constructor !== Array) {
            if (this.value.length === 0) {
                this.value = []
            } else {
                this.value = [this.value]
            }
        } else {
            if (!this.multiple && this.value.length > 1) {
                this.value = this.value.slice(0, 1)
            } else if (this.multiple && this.value.length > this.limit) {
                this.value = this.value.slice(0, this.limit)
            }
        }
    },
    data: function() {
        return {
            searchText: null,
            show: false,
            showNotify: false
        }
    },
    computed: {
        selectedItems: function() {
            let foundItems = []
            if (this.value.length) {
                for (var item of this.value) {
                    if (this.options.length === 0) {
                        // 
                        foundItems = this.value;
                    } else {
                        if (typeof item === "string") {
                            let option
                            this.options.some(o => {
                                if (o=== item) {
                                    option = o
                                    return true
                                }
                            })
                            option && foundItems.push(option)
                        }
                    }
                }
                return foundItems.join(', ')
            }
        },
        showPlaceholder: function() {
            return this.value.length === 0
        }
    },
    watch: {
        value: function(val) {
            if (val.length > this.limit) {
                this.showNotify = true
                this.value.pop()
                setTimeout(() => this.showNotify = false, 1000)
            }
        }
    },
    methods: {
        select: function(v) {
            if (this.value.indexOf(v) === -1) {
                if (this.multiple) {
                    this.value.push(v)
                } else {
                    this.value = [v]
                }
            } else {
                if (this.multiple) {
                    this.value.$remove(v)
                }
            }
            if (this.closeOnSelect) {
                this.toggleDropdown()
            }
        },
        isSelected: function(v) {
            if (this.value.constructor !== Array) {
                return this.value == v
            } else {
                return this.value.indexOf(v) !== -1
            }
        },
        toggleDropdown: function() {
            this.show = !this.show
        }
    }
});

function coerceBoolean(val) {
    return (typeof val !== "string" ? val :
        val === "true" ? true :
        val === "false" ? false :
        val === "null" ? false :
        val === "undefined" ? false : val)
}
