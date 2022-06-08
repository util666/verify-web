<template>
  <div class="page-wrap">
    <el-pagination
        :background="background"
        :current-page="pager.pageNum"
        :page-size="pager.pageSize"
        :page-sizes="pageSizes"
        :layout="small?'prev,pager,next':layout"
        :small="!!small"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :total="Number(total)"/>
  </div>
</template>
<script setup>

import {inject, reactive} from "vue";

let props = defineProps({
  total: {
    type: [String, Number],
    default:'0',
  },
  page: {
    type: Object,
    default: () => {
    }
  },
  layout: {
    type: String,
    default: "total, prev, pager, next, sizes, jumper"
  },
  background: {
    type: Boolean,
    default: true
  },
  pageSizes: {
    type: Array,
  }

})

let small = inject('small')()

let emit = defineEmits(['change'])

let pager = reactive({
      pageNum: 1,
      pageSize: 10
    }
)
// 分页
let onSizeChange = (val) => {
  pager.pageSize = val;
  pager.pageNum = 1;
  emit('change', pager);
}
let onCurrentChange = (val) => {
  pager.pageNum = val;
  emit('change', pager);
}


</script>
<style lang="scss">
.el-pagination__sizes {
  margin: 0 16px;
}

.el-pagination__jump {
  margin: 0;
}

.page-wrap {
  display: flex;
  justify-content: flex-end;
  background-color: #ffffff;
  margin-top: 20px;
  border-top: 2px solid #ebeef5;

  .el-pagination {
    padding: 30px;
  }
}

</style>
