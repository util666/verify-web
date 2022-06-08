<template>
  <div>
    <el-dialog
        :width="small?'90%':'50%'"
        v-model="visible"
        :title="dialog.title"
        :close-on-click-modal="dialog.closeOnClickModal"
        :before-close="dialog.beforeClose"
        :draggable="dialog.draggable">
      <lt-render
          class="dialog-body"
          v-if="dialog.body"
          :data="dialog.body.data"
          :render="dialog.body.render"
      >
      </lt-render>
      <template #footer v-if="dialog.footer">
        <lt-render
            class="dialog-footer"
            :data="dialog.footer.data"
            :render="dialog.footer.render"
        >
        </lt-render>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, inject} from "vue";


const props = defineProps({
  dialog: {
    type: Object,
    default: () => ({
      title: '标题',
    }),
  },
})
const small = inject('small')()

const dialog = props.dialog

// 默认可以拖拽
// eslint-disable-next-line vue/no-mutating-props
dialog.draggable = (dialog.draggable === undefined) ? true : dialog.draggable


const visible = ref(false)
//显示
const show = () => {
  visible.value = true
}
//隐藏
const close = () => {
  visible.value = false
}

defineExpose({
  show,
  close,
})

</script>

<style scoped>

</style>