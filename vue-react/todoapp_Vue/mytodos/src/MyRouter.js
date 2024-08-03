import { createRouter, createWebHistory } from 'vue-router';
import NoFound from './pages/NoFound.vue';
import MainSection from './pages/MainSection.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainSection },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NoFound },
  ],
});

export default router;
