import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    init() {
        super.init()
        this.$on('table:select', $cell => {
            this.$root.find('#formula').text($cell.text())
        })

        this.$on('table:input', $cell => {
            this.$root.find('#formula').text($cell.text())
        })
    }

    onKeydown(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault()
            this.$emit('formula:focus')
            console.log(111)
        }
    }

    onInput(event) {
        const text = event.target.textContent
        this.$emit('formula:input', text)
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
    }
}
