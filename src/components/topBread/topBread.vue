<template>
  <div class="topBreadWrap">
    <div>
      <div class="navList" :class="item.name==navActive.name?'navActive':''" v-for="(item,index) in navList"
           :key="item.name">
        <div class="px-10 pointer" @click="pushRoute(item)">{{ item.title }}</div>
        <el-icon class="pointer" v-if="index!==0" @click="removeRoute(index)">
          <Close/>
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

const route = useRoute()
const router = useRouter()
const store = useStore()
//删除一个标签
const removeRoute = (index) => {
  if (navActive.value.name == navList.value[index].name) {
    navActive.value = navList.value[index - 1]
  }
  navList.value.splice(index, 1)
  store.commit('global/SET_NAV_LIST', navList.value)
  router.push(navActive.value.fullPath)
}

//跳转到点击的路由
const pushRoute = (item) => {
  router.push(item.fullPath)
}

let navList = ref(store.state.global.navList)
let navActive = ref({})


watch(() => store.state.global.navList, (newValue, oldValue) => {
  navList.value = store.state.global.navList
}, {immediate: true})


watch(() => route.path, (newValue, oldValue) => {
  navActive.value = navList.value.filter(item => {
    return item.name == route.name || route.path == '/'
  })[0] || {}
  if (!navActive.value.name && !route.meta.specialLayout) {
    //如果navList中没有当前路由信息,就加进去
    navList.value.push({fullPath: route.fullPath, name: route.name, title: route.meta.title})
    store.commit('global/SET_NAV_LIST', navList.value)
    navActive.value = navList.value[navList.value.length - 1]
  }
}, {immediate: true})

</script>

<style lang="scss" scoped>
.topBreadWrap {
  height: 50px;
  border-bottom: 1px solid #ccc;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;

  > div {
    position: sticky;
    height: 50px;
    width: 100%;
    top: 60px;
    display: flex;
    align-items: center;
  }
}


.navList {
  height: 50px;
  align-items: center;
  display: flex;
  border-right: 1px solid #ccc;
  padding: 0 10px;
}

.navActive {
  background-color: #6cbfbb;
  color: #ffffff;
  border: none;
}
</style>