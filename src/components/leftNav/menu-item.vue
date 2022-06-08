<template>
  <div>
    <div v-for="(item,index) in menuList" :key="menuId?menuId+'-'+(index+1):(index+1)+''">
      <el-menu-item
          v-if="!item.children||item.children.length==0"
          :index="item.path"
          @click="selectMenu(item,index)"
      >
        <template #title>
          <span>{{ item.title || item.name }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-else :index="menuId?menuId+'-'+(index+1):(index+1)+''">
        <template #title>
          <span>{{ item.title || item.name }}</span>
        </template>
        <menu-item :menuId="menuId!=''?menuId+'-'+(index+1):(index+1)+''" :menuList="item.children"></menu-item>
      </el-sub-menu>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";



let props = defineProps({
  menuList: {
    type: Array,
    default: () => [],
  },
  menuId: {
    type: String,
    default: '',
  }
})

let selectMenu = (item,index) => {
  // router.push(item.path)
}
</script>

<style scoped>

</style>