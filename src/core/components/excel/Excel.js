import {$} from "@core/DOM";
import {Emitter} from "@core/Emitter";
import {StoreSubscriber} from "@core/StoreSubscriber";

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store || {}
        this.subscriber = new StoreSubscriber(this.store)
    }
    getRoot() {
        const $root = $.create('div', 'excel')
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }
        const componentsArr = this.components.map( Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)

            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        this.components = componentsArr
        return $root
    }

    init() {
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.components.forEach(component => component.destroy())
        this.subscriber.unsubscribeFromStore()
    }
}
