import {Router} from "@core/router/Router"
import {DashboardPage} from "@/pages/DashboardPage"
import './sccs/index.scss'
import {ExcelPage} from "@/pages/ExcelPage";

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})
