<template>
  <div class="common-layout">
    <el-container v-if="!$route.meta.specialLayout">
      <el-header>
        <top-nav class="top-nav" :paddingSize="small()?'px-10':'px-40'"></top-nav>
      </el-header>

      <el-container>
        <el-aside :width="showTab ? '200px' : '0px'">
          <left-nav :showTab="showTab" :menuList="menuList" @setShowTab="showTab=!showTab"></left-nav>
        </el-aside>
        <el-main>
          <topBread></topBread>
          <router-view v-slot="{ Component }">
            <!--            <keep-alive :max="20">-->
            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive||!$route.name"/>
            <!--            </keep-alive>-->
            <component :is="Component" v-if="!$route.meta.keepAlive"/>
          </router-view>
        </el-main>
        <!--        <el-footer>Footer</el-footer>-->
      </el-container>
    </el-container>
    <router-view v-else></router-view>
  </div>

</template>

<script setup>
import {provide, ref, reactive} from "vue";
import LeftNav from "@/components/leftNav/leftNav";
import TopNav from "@/components/topNav/topNav";
import TopBread from "@/components/topBread/topBread"

let includeList = reactive([])

let showTab = ref(true)

let small = () => {
  return window.innerWidth <= 540 ? 'small' : null
}
provide('small', small)

const menuList = reactive([
  {
    name: '菜单',
    children: [
      {
        name: '教程',
        path: '/tutorial',
      },
    ]
  },
])
</script>

<style lang="scss">
//引入更改element的公共样式
@import "./style/element";
//引入自定义公共样式
@import "style/base";

html, body {
  height: 100%;
}

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.common-layout, .el-container {
  height: 100%;
  overflow: auto;

  .el-aside {
    background-color: #393D49;
    overflow: initial;
    transition: all 0.4s;
  }

  .el-main {
    position: relative;
    padding-top: 70px;
    padding-right: 0;

    .wrap {
      > div {
        padding-right: 20px;
      }
    }
  }

  .el-menu {
    border-right: 0;
  }

  .el-header {
    background-color: #2a3642;
    overflow: hidden;
    position: sticky;
    top: 0;
    z-index: 9;
    color: #ffffff;
  }

}
</style>
