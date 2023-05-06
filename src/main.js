import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios";
import vueAxios from 'vue-axios';
import App from './App.vue'

const app = createApp(App);
app.use(vueAxios,axios)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus);
app.mount('#app')
