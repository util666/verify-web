<template>
  <div class="wrap">
    <div>
      <div class="userInfo" v-if="store.state.account.userInfo">
        <div>
          <span>程序总数 : {{ store.state.account.userInfo.programTotal }}</span>
          <span>用户总数 : {{ store.state.account.userInfo.userTotal }}</span>
          <span>vip到期时间 : {{ store.state.account.userInfo.vip_time }}</span>
        </div>
      </div>
      <div class="left-button">
        <el-button type='primary' @click="addDialog()">创建程序</el-button>
      </div>
      <lt-table :table-data="tableData" :table-column="tableColumn"></lt-table>
    </div>
    <div>
      <lt-pager :background="false" :total="total" class="footer-page" @change="pagerChange"></lt-pager>
    </div>

  </div>
  <lt-dialog ref="dialogRef" :dialog="dialog"></lt-dialog>
</template>

<script setup>

import {onMounted, reactive, ref,} from "vue"
import router from "@/router";
import {service} from "@/service";
import {useStore} from "vuex";
import {ElMessageBox} from "element-plus";


let dialog = reactive({})
let dialogRef = ref()
let formDataRef = ref()
let total = ref('0')
const store = useStore()
let tableData = ref([])
const getProgram = async () => {
  //获取程序列表
  // let loading = await store.dispatch('global/loading')
  let result = await service('getProgram', {
    data: {
      ...pager,
    }
  }).finally(() => {
    // loading.close()
  })
  if (result.state) {
    tableData.value = result.data
    total.value = result.page?.total || '0'
  }
}

onMounted(() => {
  getProgram()
})

//创建程序
const addProgram = async () => {
  let loading = await store.dispatch('global/loading')
  let result = await service('addProgram', {
    data: {...formData.value}
  }).finally(() => {
    loading.close()
  })
  if (result.state) {
    dialogRef.value?.close()
    await getProgram()
  }
}
const addDialog = () => {
  formData.value = {}
  dialog.title = '创建程序'
  dialog.body = {
    data: {},
    render: () => {
      return (<lt-form configData={formConfig} formData={formData.value}></lt-form>)
    }
  }
  dialog.footer = {
    data: {},
    render: () => {
      return (<div>
        <el-button type='primary' onClick={dialogRef.value?.close}>取消</el-button>
        <el-button type='primary' onClick={() => {
          addProgram()
        }}>提交
        </el-button>
      </div>)
    }
  }
  dialogRef.value?.show()
}

//查看当前程序的用户
const pushUserList = (data) => {
  // 当前程序
  store.commit('global/SET_PROGRAM_OBJ', {...data.row})
  router.push({name: 'userList'})
}

//修改程序弹窗配置
let formConfig = reactive([
  {label: "版本号", key: "version", type: "input",},
  {label: "程序名称", key: "programName", type: "input",},
  {label: "公告消息", key: "message", type: "input",},
])

let formData = ref({})

const reviseProgram = async (data) => {
  let loading = await store.dispatch('global/loading')
  let result = await service('reviseProgram', {
    data: {
      ...formData.value,
    }
  }).finally(() => {
    loading.close()
  })
  if (result.state) {
    dialogRef.value?.close()
    await getProgram()
  }
}

const reviseDialog = (data) => {
  formData.value = data.row
  dialog.title = '编辑'
  dialog.body = {
    data: {},
    render: () => {
      return (<lt-form configData={formConfig} formData={formData.value}></lt-form>)
    }
  }
  dialog.footer = {
    data: {},
    render: () => {
      return (<div>
        <el-button type='primary' onClick={dialogRef.value?.close}>取消</el-button>
        <el-button type='primary' onClick={() => {
          reviseProgram(data)
        }}>提交
        </el-button>
      </div>)
    }
  }
  dialogRef.value?.show()
}
const deleteProgram = async (data) => {
  let confirm = await ElMessageBox.confirm('程序一旦删除无法恢复, 确认删除吗?').then(() => true).catch(() => false)
  if (!confirm) return false
  let loading = await store.dispatch('global/loading')
  let result = await service('deleteProgram', {
    data: {
      ...data.row,
    }
  }).finally(() => {
    loading.close()
  })
  if (result.state) {
    dialogRef.value?.close()
    await getProgram()
  }
}

//表格配置
const tableColumn = reactive([
  {label: "序号", type: 'index'},
  {value: "programName", label: "程序名称",},
  {value: "program", label: "程序编号",},
  {value: "message", label: "公告消息",},
  {value: "version", label: "版本号",},
  {value: "userNum", label: "用户数量",},
  {
    label: "操作", type: "render", width: '280px',
    render: (data) => {
      return (
          <el-space spacer={"|"}>
            <el-button type="primary" onClick={() => pushUserList(data)} text>查看用户</el-button>
            <el-button type="primary" onClick={() => reviseDialog(data)} text>编辑</el-button>
            <el-button type="primary" onClick={() => deleteProgram(data)} text>删除</el-button>
          </el-space>
      )
    }
  },
])


const pager = reactive({
  pageNum: '1',
  pageSize: '10',
})
//分页更改后的回调
const pagerChange = (page) => {
  pager.pageNum = page.pageNum
  pager.pageSize = page.pageSize
  getProgram()
}


</script>

<style lang="scss" scoped>
.wrap {
  flex-direction: column;
  display: flex;
  flex: 1;
  flex-basis: auto;
  justify-content: space-between;
  height: 100%;
  overflow: auto;
  >div {
    overflow: auto;
  }
}

.left-button {
  border-top: 2px solid #ebeef5;
  padding: 20px;
}

.userInfo {
  overflow: auto;
  height: 40px;

  > div {
    min-width: 500px;
    display: flex;
    justify-content: space-around;
    align-items: center;

  }
}
</style>