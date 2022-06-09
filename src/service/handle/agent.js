import request from "../utils/request"
import response from "../utils/response"

const list = [
    {
        name: 'login',
        url: 'api/login',
    },
    {
        name: 'register',
        url: 'api/register',
    },
    {
        name: 'userinfo',
        url: 'account/userinfo',
    },
    {
        name: 'updatePwd',
        url: 'account/updatePwd',
    },
]
list.map(item => {
    item.requestHandle = item.requestHandle || request.requestHandle
    item.responseHandle = item.responseHandle || response.responseHandle
})
export default list