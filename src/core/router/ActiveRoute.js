export class ActiveRoute {
    static get path() {
        return window.location.hash
    }
    static get param() {
        return this.path.slice(1)
    }
}
