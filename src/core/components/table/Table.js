import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@core/components/table/table.template";
import {resizeHandler} from "@core/components/table/table.resize";

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor(root) {
        super(root, {
            listeners: ['mousedown']
        });
        this.$root = root
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const type = event.target.dataset.resize
            const resize = event.target
            const parent = event.target.closest('div[data-type="resizable"]')
            resizeHandler(event, type, resize, parent, this.$root.$el)
        }
    }

    toHTML() {
        return createTable(50)
    }
}
