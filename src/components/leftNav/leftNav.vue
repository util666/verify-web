<template>
  <div class="leftTabWrap">
    <div class="arrow" @click="setShowTab">
      <el-icon v-show="showTab" :size="30">
        <DArrowLeft color="#fff"/>
      </el-icon>
      <el-icon v-show="!showTab" :size="30">
        <DArrowRight color="#fff"/>
      </el-icon>
    </div>
    <div class="oh">
      <el-menu :router="true"
               :default-active="$route.path">
        <menu-item :menuList="menuList"></menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import {h, ref} from "vue";
import MenuItem from "@/components/leftNav/menu-item";

const props = defineProps({
  showTab: Boolean,
  menuList: Array,
})

const emit = defineEmits(['setShowTab'])
let setShowTab = () => {
  emit('setShowTab')
}


</script>

<style lang="scss" scoped>
.leftTabWrap {
  position: relative;
  width: 100%;
  height: 100%;

  :deep(.el-menu) {
    .el-menu-item, .el-sub-menu__title {
      color: #ffffff;
      background-color: #393D49;
    }

    .el-menu-item:hover, .el-sub-menu .el-sub-menu__title:hover {
      background-color: #4E5465;
    }


    .el-menu-item.is-active {
      background-color: #6cbfbb;
      color: #ffffff;
    }

  }

  .arrow {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    z-index: 999;
    background-color: #393D49;
    height: 30px;
  }
}

.logo {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}
</style>