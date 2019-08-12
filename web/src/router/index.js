import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routers = [{
    path: '/',
    name: 'dashboard',
    title: 'dashboard',
    component: resolve => {
        require(['@/pages/dashboard.vue'], resolve)
    }
}];

const RouterConfig = {
    mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);
