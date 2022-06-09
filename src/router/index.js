import {createRouter, createWebHistory} from "vue-router";
import account from "@/store/module/account"
import {getCookie} from "@/utils/storage";
import {management} from "@/router/management";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( "@/views/home/home"),
        meta: {
            keepAlive: false,
            title: "首页",
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( "@/views/login/login"),
        meta: {
            keepAlive: false,
            specialLayout: "fullScreen",
            title: "登录页",
        },
    },
    {
        path: '/404',
        name: '404',
        component: () => import( "@/views/404/404"),
        meta: {
            keepAlive: false,
            specialLayout: "fullScreen",
            title: "404",
        },
    },
    ...management,
]

routes.map(item => {
    //没有定义keepAlive就默认为true
    item.meta.keepAlive = item.meta.keepAlive === undefined ? true : item.meta.keepAlive
})

const router = createRouter({
    history: createWebHistory(),
    routes
})

//免登录页面
const exemptLogin = ['queryUser', 'unbindDevice']

router.beforeEach((to, from, next) => {
    let token, userInfo
    try {
        token = account.state.token || getCookie('token')
        userInfo = account.state.userInfo || localStorage.getItem('userInfo')
    } catch (e) {
    }
    //没有登录就跳转到登录页
    if ((!token || !userInfo) && to.name !== "login" && !exemptLogin.includes(to.name)) {
        next("/login");
        return;
    }
    if (to.matched.length) {
        next();
    } else {
        next("/404");
    }
});

export default router;
