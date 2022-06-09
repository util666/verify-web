<template>
  <div class="h-100">
    <div class="aic h-100 ft-18 topNavWrap">
      <div class="logo" @click="$router.push({name:'home'})">
        <h2>后台管理系统</h2>
      </div>
      <div v-if="store.state.account.userInfo" :class="paddingSize">账号:{{ store.state.account.userInfo?.account }}</div>
      <el-dropdown ref="dropdownRef" trigger="contextmenu">
        <div class="Setting pointer">
          <el-icon @click="dropdownShow">
            <Setting/>
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="refreshAccount">刷新账户</el-dropdown-item>
            <el-dropdown-item @click="reviseDialog">修改密码</el-dropdown-item>
            <el-dropdown-item @click="$router.push({name:'login'})">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <lt-dialog ref="dialogRef" :dialog="dialog"></lt-dialog>
  </div>

</template>

<script setup>
import {useStore} from "vuex";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {service} from "@/service";
import {useRouter} from "vue-router";

const store = useStore()
const dropdownRef = ref()
const dialogRef = ref()
const router=useRouter()
let props = defineProps({
  paddingSize: String
})
const refreshAccount = () => {
  store.dispatch('account/getUserInfo')
}
const revisePassword = async () => {
  let passwordRules = /^\S{6,12}$/
  if (!passwordRules.test(revisePwsData.value.newPwd)) return ElMessage.error('密码应为6-12位字符')
  if (revisePwsData.value.newPwd !== revisePwsData.value.repeatNewPwd) {
    return ElMessage.error('重复密码不一致')
  }
  let loading = await store.dispatch('global/loading')
  let result = await service('updatePwd', {
    data: {
      oldPwd: revisePwsData.value.oldPwd,
      newPwd: revisePwsData.value.newPwd,
    }
  }).finally(() => {
    loading.close()
  })
  if (result.state) {
    dialogRef.value?.close()
    await router.push({name: 'login'})
  }
}
const dropdownShow = () => {
  dropdownRef.value.handleOpen()
}
let revisePwsConfig = reactive([
  {
    label: '旧密码',
    key: 'oldPwd',
    type: 'input',
  },
  {
    label: '新密码',
    key: 'newPwd',
    attrs: {
      type: "password",
      'show-password': true,
    },
    type: 'input',
  },
  {
    label: '重复密码',
    key: 'repeatNewPwd',
    attrs: {
      type: "password",
      'show-password': true,
    },
    type: 'input',
  },
])
let revisePwsData = ref({})
let dialog = reactive({})
const reviseDialog = () => {
  revisePwsData.value = {}
  dialog.title = '增加用户时长'
  dialog.body = {
    data: {},
    render: () => {
      return (
          <lt-form labelWidth={'100px'} col={2} labelSuffix="：" configData={revisePwsConfig} formData={revisePwsData.value}></lt-form>)
    }
  }
  dialog.footer = {
    data: {},
    render: () => {
      return (<div>
        <el-button type='primary' onClick={dialogRef.value?.close}>取消</el-button>
        <el-button type='primary' onClick={revisePassword}>提交
        </el-button>
      </div>)
    }
  }
  dialogRef.value?.show()
}

</script>

<style scoped>
.topNavWrap {
  position: relative;
  justify-content: flex-end;
}

.logo {
  position: absolute;
  left: 0;
}

.Setting {
  height: 20px;
  font-size: 20px;
  color: #fff;
}
</style>