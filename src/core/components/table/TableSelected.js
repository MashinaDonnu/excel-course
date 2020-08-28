export class TableSelected {
    static className = 'selected'

    constructor() {
        this.group = [],
        this.current = null
    }

    select($el) {
        this.clear()
        this.current = $el
        this.group.push($el)
        $el.focus().addClass(TableSelected.className)
    }

    selectGroup($group) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelected.className))
    }

    clear() {
        this.group.forEach( el => el.removeClass(TableSelected.className))
        this.group = []
    }
}
