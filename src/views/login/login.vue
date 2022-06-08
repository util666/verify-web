<template>
  <div class="wrap">
    <div :class="small?'small-container':'login-container'">
      <div class="logo">{{ isRegister ? "欢迎注册" : "欢迎登录" }}</div>
      <div class="user">
        <el-input size="large" @keyup.enter="loginFun" prefix-icon="user" placeholder="请输入用户名"
                  v-model="login.account"></el-input>
      </div>
      <div class="password">
        <el-input size="large" @keyup.enter="loginFun" prefix-icon="lock" show-password placeholder="请输入密码"
                  v-model="login.password"></el-input>
      </div>
      <div class="verify">
        <el-input size="large" @keyup.enter="loginFun" maxlength="4" placeholder="验证码"
                  v-model="login.verify"></el-input>
        <verify ref="verifyRef"></verify>
      </div>
      <div v-if="!isRegister">
        <el-button class="isLogin" size="large" type="primary" @click="loginFun">登录</el-button>
        <el-button class="isRegister" size="large" type="primary" @click="registerChange">注册</el-button>
      </div>
      <div v-if="isRegister">
        <el-button class="isLogin" size="large" type="primary" @click="register">注册</el-button>
        <el-button class="isRegister" size="large" type="primary" @click="registerChange">返回登录</el-button>
      </div>

    </div>
  </div>
</template>

<script setup>
import {reactive, ref, inject} from "vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import Verify from "@/components/verify/verify";
import {setCookie} from "@/utils/storage";

let small = inject('small')()
//进入login页时清空用户信息
localStorage.clear()
setCookie('token', '', -1)

const router = useRouter()
const store = useStore()

let login = reactive({
  account: '',
  password: '',
  verify: '',
})
let verifyRef = ref(null)

let isRegister = ref(false)

const registerChange = () => {
  isRegister.value = !isRegister.value
  //切换登录注册时更改验证码
  verifyRef.value.handleDraw()
}
const register = async () => {
  let accountRules = /^[1-9]\d{5,9}$/
  let passwordRules = /^\S{6,12}$/
  if (!accountRules.test(login.account)) return ElMessage.error('账户应为6-10位数字')
  if (!passwordRules.test(login.password)) return ElMessage.error('密码应为6-12位字符')
  if (verifyRef.value.imgCode != login.verify.toUpperCase()) return ElMessage.error('验证码不正确')
  let result = await store.dispatch('account/register', login)
  if (result.state) {
    //注册成功,返回登录
    registerChange()
  }
}

let loginFun = async () => {
  if (!login.password || !login.account) return ElMessage.error('账号或密码不能为空')
  if (verifyRef.value.imgCode != login.verify.toUpperCase()) return ElMessage.error('验证码不正确')
  let result = await store.dispatch('account/login', login)
}

</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  height: 100%;
  background-image: url("@/assets/65127935.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.login-container, .small-container {
  position: absolute;
  top: 50%;
  right: 20%;
  width: 300px;
  text-align: center;
  transform: translateY(-60%);
  padding: 20px 40px 40px;
  color: #000;
  background-color: #ffffff;

  > div {
    margin-top: 20px;
    width: 100%;
  }

  :deep(.el-input__wrapper) {
    .el-input__prefix {
      font-size: 24px;
    }
  }

  .isLogin {
    width: 70%;
  }

  .isRegister {
    width: 25%;
  }
}

.small-container {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.verify {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .el-input {
    width: 180px;
    padding-right: 20px;
  }

  .img-verify {
    width: 120px;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>