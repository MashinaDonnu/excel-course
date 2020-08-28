import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@core/components/table/table.template";
import {resizeHandler} from "@core/components/table/table.resize";
import {$} from "@core/DOM";
import {TableSelected} from "@core/components/table/TableSelected";
import {matrix, nextSelector} from "@core/components/table/table.pure.func";

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor(root, options) {
        super(root, {
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
        this.$root = root
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
                const target = $target.id(true)
                const current = this.selection.current.id(true)
                const $cells = matrix(target, current).map( id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Tab',
            'Enter'
        ]

        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(event.key, id))
            this.selection.select($next)
            this.$emit('table:select', $next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }

    prepare() {
        this.selection = new TableSelected()
    }

    init() {
        super.init()
        const cell = this.$root.find('[data-id="0:0"]')
        this.selection.select(cell)
        this.$emit('table:input', cell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
            console.log('Table', text)
        })

        this.$on('formula:focus', () => {
            this.selection.current.focus().placeCaretAtEnd()
        })
    }

    toHTML() {
        return createTable(50)
    }
}


