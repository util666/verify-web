import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import components from "@/components";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, {locale: zhCn,})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
components.forEach(item => {
    app.component(item[0], item[1])
})


app.mount('#app')