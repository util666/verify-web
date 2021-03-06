import {service} from "@/service";
import {getCookie, setCookie} from "@/utils/storage";
import router from "@/router";

const getUserInfo = () => {
    try {
        return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    } catch (e) {
        return null
    }
}

export default {
    namespaced: true,
    state: {
        userInfo: getUserInfo(),
        token: getCookie('token'),
    },
    mutations: {
        SET_USERINFO(state, info) {
            state.userInfo = info;
        },
        SET_TOKEN(state, str) {
            state.token = str;
        },
    },
    actions: {
        async getUserInfo({state, commit, dispatch}, data = {}) {
            let result = await service('userinfo', {
                data,
                noMessage: true,
            })
            if (result.state && result.data) {
                commit('SET_USERINFO', result.data)
                try {
                    data = JSON.stringify(result.data);
                    localStorage.setItem("userInfo", data || {});
                    await router.push('/')
                } catch (e) {
                    console.log(e)
                }
            } else {
                await router.push('/login')
            }
        },
        async login({state, commit, dispatch}, data) {
            //登录
            let result = await service('login', {
                data,
            })
            if (result.state && result.token) {
                setCookie('token', result.token, 10)
                commit("SET_TOKEN", result.token)
                await dispatch('getUserInfo')
            }
            return result
        },
        async register({state, commit, dispatch}, data) {
            //登录
            let result = await service('register', {
                data,
            })
            return result
        }
    },
    getters: {},
};