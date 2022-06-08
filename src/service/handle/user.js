import request from "../utils/request"
import response from "../utils/response"

const list = [
    {
        name: 'queryUser',
        url: 'api/queryUser',
        method: 'post',
    },
    {
        name: 'unbindDevice',
        url: 'api/unbindDevice',
        method: 'post',
    },
    {
        name: 'queryChild',
        url: 'account/queryChild',
    },
    {
        name: 'addChild',
        url: 'account/addChild',
    },
    {
        name: 'reviseChild',
        url: 'account/reviseChild',
    },
    {
        name: 'deleteChild',
        url: 'account/deleteChild',
    },

]
list.map(item => {
    item.requestHandle = item.requestHandle || request.requestHandle
    item.responseHandle = item.responseHandle || response.responseHandle
})
export default list