import Vue from 'vue'
import VueRouter from 'vue-router'
import Ping from '../components/Ping.vue';
import Books from '../components/Books.vue';
import Test from '../components/Test.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Books',
    component: Books,
  },
  {
    path: '/ping',
    name: 'Ping',
    component: Ping,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
