import { createRouter, createWebHistory } from 'vue-router';
import BookList from '../components/BookList.vue';
import BookSearch from '../components/BookSearch.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  { path: '/', component: BookList },
  { path: '/search', component: BookSearch },
  { path: '/:pathMatch(.*)*', component: NotFound},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;