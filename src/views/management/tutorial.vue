<template>
  <div>
    <lt-table :minWidth="'1000px'" ref="tableDataRef" :table-data="tableData" :table-column="tableColumn"></lt-table>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";

let tableData = ref([
  {
    interfaceName: '用户登录',
    interfacePath: 'http://47.98.229.173/api/loginUser?id=ae801b8ffc0b4f44852546ea51cc230e&account=147258369&device_code=123456&program=1',
    requestMethod: 'get',
    explanation: 'id=用户id,\ndevice_code=设备码,\naccount=账号,\nprogram=程序编号',
    remark: '参数顺序可以更改,但不能缺少',
  },
  {
    interfaceName: '查询用户是否存在',
    interfacePath: 'http://47.98.229.173/queryUser?account=147258369',
    requestMethod: '浏览器打开',
    explanation: 'account=账号',
    remark: '',
  },
  {
    interfaceName: '解绑用户设备码',
    interfacePath: 'http://47.98.229.173/unbindDevice?account=147258369',
    requestMethod: '浏览器打开',
    explanation: 'account=账号',
    remark: '',
  },
])
let tableColumn = reactive([
  {label: "序号", type: 'index', width: '60px'},
  {value: "interfaceName", label: "接口名", width: '150px'},
  {value: "interfacePath", label: "接口路径", minWidth: '440px'},
  {value: "requestMethod", label: "请求方式", width: '100px'},
  {value: "explanation", label: "参数说明", minWidth: '150px'},
  {value: "remark", label: "备注", width: '100px'},
])
</script>

<style scoped>

</style>