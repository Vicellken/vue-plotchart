import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import D3bar from '../components/d3bar.vue'
import D3pie from '../components/d3pie.vue'
import LineChart from '../components/LineChart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/d3bar',
    name: 'D3bar',
    component: D3bar
  },
  {
    path: '/d3pie',
    name: 'D3pie',
    component: D3pie
  },
  {
    path: '/linechart',
    name: 'LineChart',
    component: LineChart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
