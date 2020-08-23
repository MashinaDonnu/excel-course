import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/DOM";
import {createTable} from "@core/components/table/table.template";
import {resizeHandler} from "@core/components/table/table.resize";
import {TableSelection} from "@core/components/table/TableSelection";

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor(root) {
        super(root, {
            listeners: ['mousedown']
        });
        this.$root = root
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const cell = this.$root.find('[data-id="0:0"]')
        this.selection.select(cell)
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const type = event.target.dataset.resize
            const resize = event.target
            const parent = event.target.closest('div[data-type="resizable"]')
            resizeHandler(event, type, resize, parent, this.$root.$el)
        } else if (event.target.dataset.type === 'cell') {
            const $target = $(event.target)
            if (event.shiftKey) {
                this.selection.selectGroup($target, this.$root)
            } else {
                this.selection.select($target)
            }
        }
    }

    toHTML() {
        return createTable(50)
    }
}
