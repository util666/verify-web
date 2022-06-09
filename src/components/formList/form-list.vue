<template>
  <div>

  </div>
</template>

<script type="text/jsx">
import {generateFormItem} from "./form-item";
import {h, inject, ref,} from "vue"

export default {
  name: 'lt-form',
  props: {
    formData: {type: Object, default: () => ({})},//表单数据
    configData: {type: Array, default: () => []},//表单
    disabled: {type: Boolean, default: false},//禁止更改
    inline: {type: Boolean, default: false},//行内表单模式
    labelWidth: {type: [String, Number], default: ""},//label宽度,不填自适应
    labelPosition: {type: String, default: "left"},//标签位置,
    labelSuffix: {type: String, default: ""},//标签后缀
    col: {type: Number, default: 0},//表单占每行多少 0,1,2,3,4 (0是自适应)
    size: {type: String, default: 'default'},//标签大小 'large' | 'default' | 'small'
    formId: {type: String, default: 'el-form'},//id
  },

  setup(props, content) {
    let small = inject('small')()

    return () => {
      let rules = {}

      function getRules(item) {
        if (item.required) {
          //错误提示内容
          let message = item.placeholder;
          if (item.label) {
            message = `请${item.type === "select" ? "选择" : "输入"}${item.label}`;
          }
          //触发事件
          let trigger = "blur";
          if (item.type === "cascader") {
            trigger = ["blur", "change"];
          } else if (item.type === "editor") {
            trigger = "change";
          }
          return [{required: true, message, trigger}];
        }
      }

      function getFormItemList() {
        let formItemList = []
        props.configData.map((item, index) => {
          //表单校验
          rules[item.key] = item.rules ? item.rules.concat(getRules(item) || []) : getRules(item)

          if (small && (item.type === 'dateTimeRange' || item.type == 'dateRange') && props.formData[item.key] == undefined) {
            //小屏幕选择时间范围 用两个时间组件
            // eslint-disable-next-line vue/no-mutating-props
            props.formData[item.key] = []
            item.isSmall = true
          }
          if (small) {
            item.col = 1
          }

          if (item.default) {
            //更改默认数据
            // eslint-disable-next-line vue/no-mutating-props
            props.formData[item.key] = item.default
            item.default = ''
          }

          let formItem = null;
          if (item.type === "empty") {
            formItem = <span></span>;
          } else if (item.type === "string") {
            formItem = <span class="overflow-hidden">{props.formData[item.key]}</span>;
          } else if (item.type === "render" && item.render) {
            //自定义formItem
            formItem = item.render(props.formData)
          } else {
            formItem = generateFormItem(item, props.formData);
          }

          formItem = (
              <el-form-item
                  key={item.key}
                  label={item.noLabel ? '' : item.label}
                  prop={item.key}
                  class={item.className || ''}
                  label-width={item.noLabel ? "0px" : item.labelWidth || props.labelWidth}
                  {...{props: item.props}}
              >
                {formItem}
              </el-form-item>
          );
          //没有固定每行几个元素,就自适应
          if (!props.col && !item.col) {
            formItem = (
                <el-col xs={24} sm={12} md={8} lg={6} xl={6} class={"px-16"}>
                  {formItem}
                </el-col>
            );
          } else {
            let col = Math.floor(24 / (item.col || props.col))
            formItem = (
                <el-col span={col} class={"px-16"}>
                  {formItem}
                </el-col>
            );
          }

          formItemList.push(formItem);
        })

        return formItemList
      }

      let formItemList = getFormItemList()

      return h(
          <el-form
              id={props.formId}
              onsubmit={() => false}
              {...{
                model: props.formData,
                rules: rules,
                inline: props.inline,
                disabled: props.disabled,
                size: small || props.size,
                "label-position": props.labelPosition,
                "label-width": props.labelWidth,
                "label-suffix": props.labelSuffix,
                "validate-on-rule-change": false,
                ref: "form",
                key: "form"
              }}
          >
            <el-row>
              {formItemList}
            </el-row>
          </el-form>)

    }
  },
}
</script>

<style lang="scss">
.el-form {
  overflow: auto;
}

.isSmallForm {
  display: flex;

  input {
    text-align: center;
  }
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.el-form-item__content {
  .el-range-editor.el-input__inner {
    padding: 0 10px;
  }

  .el-range-editor.el-input__wrapper {
    padding: 0 10px;
  }
}

</style>