import './sccs/index.scss'
import {Excel} from "@core/components/excel/Excel"
import {Header} from "@core/components/header/Header";
import {ToolBar} from "@core/components/toolbar/ToolBar";
import {Formula} from "@core/components/formula/Formula";
import {Table} from "@core/components/table/Table";

const excel = new Excel('#app', {
  components: [Header, ToolBar, Formula, Table]
})
excel.render()
