import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:id',
        name: 'Ship',
        component: () => import(/* webpackChunkName: "ship" */ '../views/Ship.vue')
    },
];

const router = new VueRouter({
    publicPath: '/my_app/',
    mode: 'history',
    routes
});

export default router;
