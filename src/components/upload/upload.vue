<template>
  <el-upload
      class="w-100"
      :accept="accept"
      :show-file-list="false"
      :httpRequest="httpRequest"
      :drag="drag"
  >
    <slot></slot>
  </el-upload>
</template>
<script setup>
import {reactive, ref} from 'vue'
import {service} from "@/service";
import {ElMessage} from "element-plus";
import store from "@/store";


const props = defineProps({
  drag: Boolean,
  button: {
    type: String,
    default: 'link',
  },
  action: {
    type: String,
    default: '',
  },
  accept: {
    type: String,
    default: '.xls,.xlsx,application/vnd.ms-excel',
  },
  data: {type: Object}
})

const emits = defineEmits(['uploadResult'])

//自定义上传
const httpRequest = async (item) => {
  const isLt5M = item.file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    ElMessage.error('上传文件不能超过5MB')
    return
  }

  let mf = new FormData()
  mf.append('file', item.file)

  //遍历需要携带的参数
  Object.keys(props.data).map(key => {
    mf.append(key, props.data[key])
  })

  let loading = await store.dispatch('global/loading')
  let result = await service(props.action, {data: mf}).finally(() => {
    loading.close()
  })
  //把返回结果返回父级组件
  emits('uploadResult', result)

}


</script>
<style scoped>

</style>