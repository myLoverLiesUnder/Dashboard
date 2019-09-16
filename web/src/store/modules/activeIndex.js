const activeIndex = {
    store: {
        activeIndex: '/'
    },
    mutations: {
        ACTIVE_CHANGE: (state, value) => {
            state.activeIndex = value;
        }
    },
    actions: {
        ActiveChange: ({ commit }, data) => {
            commit('ACTIVE_CHANGE', data.activeIndex)
        }
    }
};

export default activeIndex
