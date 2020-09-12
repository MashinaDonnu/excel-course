import {Page} from "@core/Page"
import {createStore} from "@core/createStore";
import {rootReducer} from "@core/store/rootReducer";
import {debounce, storage} from "@core/utils";
import {Excel} from "@core/components/excel/Excel";
import {Header} from "@core/components/header/Header";
import {ToolBar} from "@core/components/toolbar/ToolBar";
import {Formula} from "@core/components/formula/Formula";
import {Table} from "@core/components/table/Table";
import {defaultState} from "@core/initialState";

function storageName(name) {
    return `excel:${name.split("/")[1]}`
}

export class ExcelPage extends Page {
    getRoot() {
        const state = storageName(this.params)
        if (!storage(state)) {
            storage(state, defaultState)
        }
        const store = createStore(rootReducer,
            storage(state) ? storage(state) : defaultState
        )
        const stateListener = debounce(state => {
            console.log('STATE', storageName(this.params))
            storage(storageName(this.params), state)
        }, 500)


        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, ToolBar, Formula, Table],
            store
        })
        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }
}
