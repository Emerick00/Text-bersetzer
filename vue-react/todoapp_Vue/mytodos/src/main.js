import { createApp } from 'vue';
import App from './App.vue';
import AppRoute from './MyRouter.js';

// import HeaderMenu from './components/Utilities/HeaderMenu.vue';
import MainSection from './pages/MainSection.vue';

const app = createApp(App);
app.use(AppRoute);
app.component(MainSection);

app.mount('#app');
