export const management = [
    {
        path: '/userList',
        name: 'userList',
        component: () => import( "@/views/management/userList"),
        meta: {
            title: "用户列表",
        },
    },
    {
        path: '/tutorial',
        name: 'tutorial',
        component: () => import( "@/views/management/tutorial"),
        meta: {
            title: "教程",
        },
    },
    {
        path: '/queryUser',
        name: 'queryUser',
        component: () => import( "@/views/management/queryUser"),
        meta: {
            specialLayout: "fullScreen",
            title: "查询卡密",
        },
    },
    {
        path: '/unbindDevice',
        name: 'unbindDevice',
        component: () => import( "@/views/management/unbindDevice"),
        meta: {
            specialLayout: "fullScreen",
            title: "解绑设备码",
        },
    },
]