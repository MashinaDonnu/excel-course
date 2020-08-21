import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@core/components/table/table.template";

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
            console.log('resize', event.target.dataset.resize)
        }
    }

    toHTML() {
        return createTable(50)
    }
}
