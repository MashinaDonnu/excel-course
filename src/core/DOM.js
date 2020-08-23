class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) : selector
    }
    html(html) {
        if (html) {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.innerHTML.trim()
    }
    append(node) {
        if (node.$el instanceof DOM) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node.$el)
        } else {
            this.$el.appendChild(node)
        }
    }
    on(eventName, callback) {
        this.$el.addEventListener(eventName, callback)
    }

    off(eventName, callback) {
        this.$el.removeEventListener(eventName, callback)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    get id() {
      return this.$el.dataset.id
    }

    addClass(className) {
        this.$el.classList.add(className)
    }

    haveClass(className) {
        return this.$el.classList.contains(className)
    }

    removeClass(className) {
        this.$el.classList.remove(className)
    }

    clear() {
        this.$el.innerHTML = ''
    }
}

export function $(selector) {
    return new DOM(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}
