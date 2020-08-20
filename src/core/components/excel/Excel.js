import {$} from "@core/DOM";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }
    getRoot() {
        const $root = $.create('div', 'excel')
        const componentsArr = this.components.map( Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el)
            if (component.name) {
                window['c' + component.name] = component
            }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        this.components = componentsArr
        return $root
    }
    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
    }
}
