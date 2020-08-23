import {highlight} from "@core/components/table/table.pure.func";

export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
       this.clear()
       this.group.push($el)
       this.current = $el
       $el.addClass(TableSelection.className)
    }

    clear() {
        this.group.forEach( $el => $el.removeClass(TableSelection.className) )
        this.group = []
    }

    selectGroup($el, root) {
        const [idRow, idCell] = $el.id.split(':')
        const [currIdRow, currIdCell] = this.current.id.split(':')

        const {cells, rows} = highlight(currIdCell, idCell, idRow, currIdRow)
        console.log(rows)
        rows.forEach( row => {
            cells.forEach( id => {
                const el = root.find(`[data-id="${row}:${id}"]`)
                if (!el.haveClass(TableSelection.className)) {
                    el.addClass(TableSelection.className)
                }
                this.group.push(el)
            })
        })
    }
}
