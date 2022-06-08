<template>
  <div>
    <formList
        ref="formRef"
        :form-data="formData"
        :config-data="configData"
        :disabled="disabled"
        :inline="inline"
        :label-width="labelWidth"
        :label-position="labelPosition"
        :label-suffix="labelSuffix"
        :col="col"
        :size="size">
    </formList>
  </div>
</template>

<script setup>
import FormList from "@/components/formList/form-list";
import {ref} from "vue";

let props = defineProps({
  formData: {type: Object, default: () => ({})},//表单数据
  configData: {type: Array, default: () => []},//表单列表
  disabled: {type: Boolean, default: false},//禁止更改
  inline: {type: Boolean, default: false},//行内表单模式
  labelWidth: {type: [String, Number], default: ""},//label宽度,不填自适应
  labelPosition: {type: String, default: "left"},//标签位置,
  labelSuffix: {type: String, default: ""},//标签后缀
  col: {type: Number, default: 0},//表单占每行多少 0,1,2,3,4 (0是自适应)
  size: {type: String, default: 'default'},//标签大小 'large' | 'default' | 'small'
})
let formRef = ref()
//清除表单数据
let resetFields = () => {
  let form = formRef.value.$refs.form
  form.resetFields()
}
//表单验证
let validate = () => {
  return new Promise((resolve, reject) => {
    let form = formRef.value.$refs.form
    form.validate((success, error) => {
      if (success) {
        resolve(success);
      } else {
        console.log('表单校验不通过', error)
        // reject(error);
      }
    })
  })
}
defineExpose({
  resetFields,
  validate,
})

</script>


<style lang="scss">

</style>