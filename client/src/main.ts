import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import './global.css';
import 'element-plus/packages/theme-chalk/src/base.scss'
import './element-plus-vars.scss';


const app = createApp(App);
app.use(router);
app.mount("#app");
