import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import GlassList from '../views/GlassList.vue'
import PlasticList from '../views/PlasticList.vue'
import MetalList from '../views/MetalList.vue'
import PaperList from '../views/PaperList.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    name: 'GlassList',
    component: GlassList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/plasticos',
    name: 'PlasticList',
    component: PlasticList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/papeis',
    name: 'PaperList',
    component: PaperList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/metais',
    name: 'MetalList',
    component: MetalList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

export default routes
