import {ExcelComponent} from "@core/ExcelComponent";
import {changeTableName} from "@core/store/actions";
import {$} from "@core/DOM";
import {ActiveRoute} from "@core/router/ActiveRoute";
export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            subscribe: ['tableName'],
            listeners: ['input', 'click'],
            ...options
        });
    }

    onInput(event) {
        if (event.target.dataset.input === 'table-name') {
            this.$dispatch(changeTableName(event.target.value));
        }
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'h-btn') {
            switch ($target.data.value) {
                case 'exit': {
                    exit()
                    break
                }
                case 'delete': {
                    const id = ActiveRoute.param.split('/')[1]
                    Object.keys(localStorage).forEach(key => {
                        const lcId = key.split(':')[1]
                        if (id === lcId) {
                            const decision = confirm('Delete table?')
                            if (decision) {
                                localStorage.removeItem(key)
                            }
                        }
                    })
                    exit()
                    break
                }
            }
        }
    }

    storeChanged({tableName}) {
        console.log('storeChanged', tableName)
    }

    toHTML() {
        const {tableName} = this.store.getState()
        return `
            <input type="text" class="input" value="${tableName}" data-input="table-name" />

            <div>
                <div class="button" data-type="h-btn" data-value="delete">
                    <span class="material-icons" data-type="h-btn" data-value="delete">delete</span>
                </div>
                <div class="button" data-type="h-btn" data-value="exit">
                    <span class="material-icons" data-type="h-btn" data-value="exit">exit_to_app</span>
                </div>

            </div>
        `
    }
}

function exit() {
    return window.location.href = '#dashboard'
}