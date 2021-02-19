import Vue from 'vue'
import VueRouter from 'vue-router'
import Ping from '../components/Ping.vue';
import Books from '../components/Books.vue';
import Test from '../components/Test.vue';
import EmailAlert from '../components/EmailAlert.vue';
import CalculaCorretagem from '../components/CalculaCorretagem.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Books',
    component: Books,
  },
  {
    path: '/emailalert',
    name: 'EmailAlert',
    component: EmailAlert,
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
  {
    path: '/calculacorretagem',
    name: 'CalculaCorretagem',
    component: CalculaCorretagem,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
