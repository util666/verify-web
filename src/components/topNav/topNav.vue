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
            <el-dropdown-item @click="revisePassword">修改密码</el-dropdown-item>
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
import {ref} from "vue";
import {ElMessage} from "element-plus";

const store = useStore()
const dropdownRef = ref()
let props = defineProps({
  paddingSize: String
})
const refreshAccount = () => {
  store.dispatch('account/getUserInfo')
}
const revisePassword = () => {
  ElMessage.warning('作者太懒了,还没写')
}
const dropdownShow = () => {
  dropdownRef.value.handleOpen()
}
let dialog = ref({})


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