import {ElLoading} from 'element-plus'

export default {
    namespaced: true,
    state: {
        loading: null,
        programObj: {},
        navList: [{fullPath: '/', name: 'home', title: '首页'}],
    },
    mutations: {
        SET_LOADING(state, data) {
            state.loading = data;
        },
        SET_NAV_LIST(state, data) {
            state.navList = data;
        },
        SET_PROGRAM_OBJ(state, data) {
            state.programObj = data;
        },
    },
    actions: {
        loading({state, commit, dispatch}, data) {
            if (state.loading) {
                return state.loading;
            }

            let loading = ElLoading.service({
                lock: true,
                text: "加载中，请稍等...",
                // spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.7)",
                customClass: "show-loading",
            });

            commit("SET_LOADING", loading);

            return {
                close: () => {
                    commit("SET_LOADING", null);
                    loading.close();
                },
            };
        },
    },
    getters: {},
}