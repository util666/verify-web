<template>
  <div class="wrap">
    <div class="body">
      <lt-form
          ref="userFormDataRef"
          :configData="userFormConfig"
          :formData="userFormData"
          labelSuffix="：">
      </lt-form>
      <div class="left-button">
        <div>
          <el-button type='primary' @click="addDialog()">添加用户</el-button>
          <el-button type='primary' @click="reviseDialog()">增加时长</el-button>
          <el-button type='primary' @click="deleteChild()">删除用户</el-button>
        </div>
      </div>
      <lt-table ref="tableDataRef" :table-data="tableData" :table-column="tableColumn"></lt-table>
    </div>
    <div>
      <lt-pager :background="false" :total="total" class="footer-page" @change="pagerChange"></lt-pager>
    </div>
  </div>
  <lt-dialog ref="dialogRef" :dialog="dialog"></lt-dialog>
</template>

<script setup>

import {onMounted, reactive, ref, inject} from "vue";
import {service} from "@/service";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import {copyToClipboard} from "@/utils/storage";

const store = useStore()
const route = useRoute()
const small = inject('small')()
let program = store.state.global.programObj.program || ''
let programName = store.state.global.programObj.programName || ''
if (!program) {
  let navList = store.state.global.navList.filter((item, index) => {
    return item.name !== route.name
  })
  store.commit('global/SET_NAV_LIST', navList)
  router.push({name: 'home'})
}
let dialogRef = ref()
let userFormData = ref({})
let addUserData = ref({})
let userFormDataRef = ref()
let dialog = reactive({})
let total = ref('0')
let tableDataRef = ref()
let addUserConfig = reactive([
  {
    label: '有效期/天',
    key: 'days',
    type: 'input',
    attrs: {
      maxlength: '4',
    },
    on: {
      input: (value) => {
        addUserData.value.days = value.replace(/\D/g, '')
        if (value < 1) {
          ElMessage.warning('有效期不能小于1天')
          addUserData.value.days = 1
        }
      }
    }
  },
  {
    label: '新增数量/个',
    key: 'amount',
    type: 'input',
    on: {
      input: (value) => {
        addUserData.value.amount = value.replace(/\D/g, '')
        if (value < 1) {
          ElMessage.warning('新增数量不能小于1')
          addUserData.value.amount = 1
        } else if (value > 100) {
          ElMessage.warning('新增数量不能大于100')
          addUserData.value.amount = 100
        }
      }
    }

  },
  {
    label: '备注',
    key: 'remarks',
    type: 'input',
  }
])
let userFormConfig = reactive([
  {
    label: '创建时间',
    key: 'creationTime',
    type: 'dateTimeRange',
    // col: 2,
  },
  {
    label: '到期时间',
    key: 'vipTime',
    type: 'dateTimeRange',
    // col: 2,
  },
  {
    label: "", key: "name", noLabel: true, type: "render", col: 1,
    render: () => {
      return (
          <div class="jcr w-100">
            <el-button type='primary' onClick={reset}>重置</el-button>
            <el-button type='primary' onClick={getChild}>查询</el-button>
          </div>
      )
    }
  }
])

const reset = () => {
  //重置表单
  userFormDataRef.value.resetFields()
}


let tableColumn = reactive([
  {label: "选择", type: 'select'},
  {value: "id", label: "id",},
  {value: "remarks", label: "备注",},
  {value: "programName", label: "程序名称",},
  {value: "creation_time", label: "创建时间",},
  {value: "device_code", label: "设备码",},
  {value: "unbindNum", label: "解绑次数",},
  {value: "vip_time", label: "到期时间",},
])
let tableData = ref([])


const getChild = async () => {
  //获取用户
  let loading = await store.dispatch('global/loading')
  let params = {
    start_vip_time: userFormData.value?.vipTime?.[0],
    end_vip_time: userFormData.value?.vipTime?.[1],
    start_creation_time: userFormData.value?.creationTime?.[0],
    end_creation_time: userFormData.value?.creationTime?.[1]
  }
  let result = await service('queryChild', {
    data: {
      ...params,
      program,
      ...pager,
    }
  }).finally(() => {
    loading.close()
  })
  if (result.state) {
    total.value = result.page?.total || ''
    tableData.value = result.data || []
  }
}
onMounted(() => {
  getChild()
})

const addUser = async () => {
  //添加用户
  let loading = await store.dispatch('global/loading')
  let result = await service('addChild', {
    data: {
      ...addUserData.value,
      program,
      programName,
    }
  }).finally(() => {
    loading.close()
  })
  if (result.state) {
    dialogRef.value?.close()
    let list = []
    result.data.map(item => {
      list.push(item[0])
    })
    await getChild()
    dialog.title = '本次生成用户列表'
    dialog.body = {
      data: {},
      render: () => {
        return (<div class="addChildList">
          {list.map(item => {
            return <p>{item}</p>
          })}
        </div>)
      }
    }
    dialog.footer = {
      data: {},
      render: () => {
        return (<div></div>)
      }
    }
    dialogRef.value?.show()
    copyToClipboard(list)
  }
}
const deleteChild = async () => {
  //删除用户
  if (!tableDataRef.value.selectionList.length) return ElMessage.warning('请勾选后操作')
  let confirm = await ElMessageBox.confirm('用户一旦删除无法恢复, 确认删除吗?').then(() => true).catch(() => false)
  if (!confirm) return false
  let dataList = []
  tableDataRef.value.selectionList.map(item => {
    dataList.push(item.id)
  })
  let loading = await store.dispatch('global/loading')
  let result = await service('deleteChild', {
    data: {dataList}
  }).finally(() => {
    loading.close()
  })
  if (result.state) {
    dialogRef.value?.close()
    await getChild()
  }
}
const reviseChild = async () => {
  //修改用户
  let loading = await store.dispatch('global/loading')
  let dataList = []
  tableDataRef.value.selectionList.map(item => {
    dataList.push({id: item.id, vip_time: item.vip_time})
  })

  let result = await service('reviseChild', {
    data: {
      days: reviseUserData.value.days,
      dataList,
    }
  }).finally(() => {
    loading.close()
  })
  if (result.state) {
    dialogRef.value?.close()
    await getChild()
  }
}

const reviseUserConfig = reactive([
  {
    label: '增加时长/天',
    key: 'days',
    type: 'input',
    attrs: {
      maxlength: '4',
    },
    on: {
      input: (value) => {
        addUserData.value.days = value.replace(/\D/g, '')
        if (value < 1) {
          ElMessage.warning('增加时长不能小于1天')
          addUserData.value.days = 1
        }
      }
    }
  },
])
let reviseUserData = ref({})

const reviseDialog = () => {
  if (!tableDataRef.value.selectionList.length) return ElMessage.warning('请勾选后操作')
  dialog.title = '增加用户时长'
  dialog.body = {
    data: {},
    render: () => {
      return (<lt-form labelSuffix="：" configData={reviseUserConfig} formData={reviseUserData.value}></lt-form>)
    }
  }
  dialog.footer = {
    data: {},
    render: () => {
      return (<div>
        <el-button type='primary' onClick={dialogRef.value?.close}>取消</el-button>
        <el-button type='primary' onClick={() => {
          reviseChild()
        }}>提交
        </el-button>
      </div>)
    }
  }
  dialogRef.value?.show()
}

const addDialog = () => {
  let col = small ? 1 : 2
  addUserData.value = {}
  dialog.title = '添加用户'
  dialog.body = {
    data: {},
    render: () => {
      return (<lt-form
          col={col}
          labelSuffix="："
          labelWidth={'100px'}
          configData={addUserConfig}
          formData={addUserData.value}>
      </lt-form>)
    }
  }
  dialog.footer = {
    data: {},
    render: () => {
      return (<div>
        <el-button type='primary' onClick={dialogRef.value?.close}>取消</el-button>
        <el-button type='primary' onClick={() => {
          addUser()
        }}>提交
        </el-button>
      </div>)
    }
  }
  dialogRef.value?.show()
}

const pager = reactive({
  pageNum: '1',
  pageSize: '10',
})
//分页更改后的回调
const pagerChange = (page) => {
  pager.pageNum = page.pageNum
  pager.pageSize = page.pageSize
  getChild()
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

  > .body {
    overflow: auto;
  }
}

.left-button {
  margin-top: 20px;
  border-top: 2px solid #ebeef5;
  padding: 20px;
  overflow: auto;

  > div {
    min-width: 300px;
  }
}

:deep(.addChildList) {
  overflow: auto;
  border: 1px solid #ccc;
  border-bottom: none;

  p {
    text-align: center;
    padding: 8px;
    white-space: nowrap;
    border-bottom: 1px solid #cccccc;
  }
}
</style>