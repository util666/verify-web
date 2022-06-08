import request from "../utils/request"
import response from "../utils/response"

const list = [
    {
        name: 'getProgram',//获取程序
        url: 'program/getProgram',
    },
    {
        name: 'addProgram',//添加程序
        url: 'program/addProgram',
    },
    {
        name: 'reviseProgram',//更改程序
        url: 'program/reviseProgram',
    },
    {
        name: 'deleteProgram',//删除程序
        url: 'program/deleteProgram',
    },
]
list.map(item => {
    item.requestHandle = item.requestHandle || request.requestHandle
    item.responseHandle = item.responseHandle || response.responseHandle
})
export default list