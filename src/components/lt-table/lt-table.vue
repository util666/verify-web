<template>
  <div class="tableList">
    <el-table
        ref="tableRef"
        @selection-change="selectionChange"
        :data="tableData"
        :max-height="maxHeight"
        :border="border"
        :table-layout="'auto'"
    >
      <template v-for="(item ,index) in tableColumn">
        <template v-if="item.type == 'select'">
          <el-table-column
              :key="index"
              :align="item.align || 'center'"
              :fixed="item.type == 'select'&&!item.fixed?'left':item.fixed"
              :selectable="item.selectable"
              :width="item.width || 36"
              type="selection"
          ></el-table-column>
        </template>
        <template v-else-if="item.type === 'radio'">
          <el-table-column
              :key="index"
              :width="item.width || 36"
              :align="item.align || 'center'"
              :disabled="item.disabled||null"
              :enabled="item.enabled||null"
          >
            <template #default="scope">
              <el-radio class="table_radio" v-model="radioSelect" :disabled="item.disabled" :label="scope.row">
                -
              </el-radio>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type == 'index'">
          <el-table-column
              :key="index"
              :label="'序号'"
              type="index"
              :width="'60px'"
              :align="item.align || 'center'"
              :prop="item.value"
          ></el-table-column>
        </template>
        <template v-else-if="item.type === 'render' && item.render">
          <el-table-column
              :key="item.id || item.value || ''"
              :label="item.label"
              :prop="item.value"
              :sortable="item.sortable"
              :sort-method="item.sortMethod"
              :fixed="item.fixed"
              :width="item.width"
              :class-name="item.className"
              :align="item.align || 'center'"
          >
            <template #default="scope">
              <lt-render :data="{row: scope.row,column: item,index: scope.$index}" :render="item.render"/>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
              :key="index"
              :fixed="item.fixed"
              :width="item.width"
              :min-width="item.minWidth"
              :prop="item.value"
              :label="item.label"
              :align="item.align || 'center'"
          />
        </template>

      </template>

    </el-table>
  </div>
</template>

<script setup>
import LtRender from "@/components/lt-render/lt-render";
import {reactive, ref} from "vue";

defineProps({
  tableColumn: {type: Array, default: () => []},
  tableData: {type: Array, default: () => []},
  maxHeight: [String, Number],
  height: [String, Number],
  border: {type: [Boolean], default: true},
  size: String,
})

let selectionList = ref([])
const selectionChange = (list) => {
  //当前选择的数据
  selectionList.value = list
}

defineExpose({
  selectionList,
})

</script>

<style lang="scss" scoped>
.tableList {
  overflow: auto;

  .el-table {
    min-width: 1000px;
  }
}
</style>