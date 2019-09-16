import Vue from 'vue'
import App from './App.vue'
import { router } from "./router/index"
import store from './store/index'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { size: 'small', zIndex: 3000, locale });

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    store.dispatch('ActiveChange', { activeIndex: to.path });
    next()
});

new Vue({
    store: store,
    router: router,
    render: h => h(App),
}).$mount('#app');
