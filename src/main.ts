import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/helper/moment-locale'
import naive from "@/helper/component-ui";
import moment from "moment";
import vueRightMenu from "vue-right-click-menu-next";
moment.locale('zh-ch');

const app = createApp(App)

Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key])
})

// 全局挂载moment
app.config.globalProperties['$moment'] = moment

app.use(store)
	.use(router)
	.use(ElementPlus, {
		locale: zhCn,
	})
	.use(naive)
	.use(vueRightMenu)
	.mount('#app')
