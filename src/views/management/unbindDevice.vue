<template>
  <div class="wrap">
    <div class="formWrap">
      <lt-form
          ref="userFormDataRef"
          :configData="formConfig"
          :formData="formData"
          labelSuffix="：">
      </lt-form>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {service} from "@/service";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

let formConfig = reactive([
  {
    label: 'id',
    key: 'id',
    type: 'input',
    col: 4,
  },
  {
    label: "", key: "name", noLabel: true, type: "render",
    render: () => {
      return (
          <div class="w-100 unbindDevice">
            <el-button type='primary' onClick={unbindDevice}>解绑</el-button>
          </div>
      )
    }
  },
])
let formData = ref({})
let store = useStore()
let route = useRoute()
let vip_time = ref('')
const unbindDevice = async () => {
  vip_time.value = ''
  //获取用户
  let loading = await store.dispatch('global/loading')
  let params = {}
  let result = await service('unbindDevice', {
    data: {
      id: formData.value.id || '',
      account: route.query.account || ''
    }
  }).finally(() => {
    loading.close()
  })
  if (result.state) {

  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  background-image: url("@/assets/65127935.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;

  .formWrap {
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    box-sizing: border-box;
  }
}

:deep(.unbindDevice) {
  margin-top: -2px;
}

:deep(.el-form-item__label) {
  color: #000;
}

</style>