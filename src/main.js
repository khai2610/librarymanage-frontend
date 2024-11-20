import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Đảm bảo file js có chứa Modal

createApp(App).use(router).mount("#app");
