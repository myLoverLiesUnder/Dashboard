import Vue from 'vue'
import Vuex from 'vuex'
import activeIndex from './modules/activeIndex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {},
    modules: { activeIndex }
});

export default store
