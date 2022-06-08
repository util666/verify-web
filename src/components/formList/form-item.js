const formTypeGeneratorMap = {
    //文本
    text: {
        generate(item, formData, vueAttrs) {
            return (<p {...vueAttrs}>{formData[item.key]}</p>);
        }
    }, //输入框
    input: {
        generate(item, formData, vueAttrs) {
            return (<el-input
                {...vueAttrs}
                v-model={formData[item.key]}
                placeholder={item.placeholder}
                disabled={item.disabled}
            >
            </el-input>);
        }
    }, //数字输入框
    inputNumber: {
        generate(item, formData, vueAttrs) {
            return (<el-input-number
                {...vueAttrs}
                v-model={formData[item.key]}
                placeholder={item.placeholder}
                disabled={item.disabled}
            />);
        }
    }, //选择器
    select: {
        generate(item, formData, vueAttrs) {

            return (<el-select
                clearable={true}
                {...vueAttrs}
                v-model={formData[item.key]}
                placeholder={item.placeholder}
                disabled={item.disabled}
            >
                {item.optionsPrefixSlot}
                {(Array.isArray(item.options) ? item.options : []).map(option => {
                    return (<el-option
                        key={option.key || option.value}
                        label={option.label}
                        value={option.key || option.value}
                    />);
                })}
                {item.optionsPostfixSlot}
            </el-select>);
        }
    }, //文本域
    textarea: {
        generate(item, formData, vueAttrs) {
            return (<el-input
                {...vueAttrs}
                type="textarea"
                v-model={formData[item.key]}
                placeholder={item.placeholder}
                disabled={item.disabled}
                resize={item.resize}
                rows={item.rows}
            />);
        }
    },//单选
    radio: {
        generate(item, formData, vueAttrs) {
            return (<el-radio-group
                {...vueAttrs}
                v-model={formData[item.key]}
                disabled={item.disabled}
            >
                {(Array.isArray(item.options) ? item.options : []).map(option => {
                    return (<el-radio
                        label={option.key || option.value || 0}
                        key={option.key || option.value || 0}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </el-radio>);
                })}
            </el-radio-group>);
        }
    }, //日期选择
    date: {
        generate(item, formData, vueAttrs) {
            return (<el-date-picker
                {...vueAttrs}
                v-model={formData[item.key]}
                type="date"
                placeholder={item.placeholder}
                disabled={item.disabled}
            />);
        }
    }, //时间选择
    time: {
        generate(item, formData, vueAttrs) {
            return (<el-time-picker
                {...vueAttrs}
                picker-options={item.pickerOptioins || {}}
                v-model={formData[item.key]}
                placeholder={item.placeholder}
                disabled={item.disabled}
            />);
        }
    }, //日期时间选择
    dateTime: {
        generate(item, formData, vueAttrs) {
            return (<el-date-picker
                {...vueAttrs}
                type="datetime"
                v-model={formData[item.key]}
                value-format={'YYYY-MM-DD HH:mm:ss'}
                placeholder={item.placeholder}
                disabled={item.disabled}
            />);
        }
    }, //日期范围选择
    dateRange: {
        generate(item, formData, vueAttrs) {
            if (item.isSmall) {
                let swapTime = () => {
                    if (formData[item.key][0] > formData[item.key][1]) {
                        [formData[item.key][0], formData[item.key][1]] = [formData[item.key][1], formData[item.key][0]]
                    }
                }
                return (<div class="isSmallForm">
                    <el-date-picker
                        {...vueAttrs}
                        onBlur={swapTime}
                        type="date"
                        v-model={formData[item.key][0]}
                        value-format={'YYYY-MM-DD HH:mm:ss'}
                        placeholder="开始日期"
                        disabled={item.disabled}
                    />
                    至
                    <el-date-picker
                        {...vueAttrs}
                        onBlur={swapTime}
                        type="date"
                        v-model={formData[item.key][1]}
                        value-format={'YYYY-MM-DD HH:mm:ss'}
                        placeholder="结束日期"
                        disabled={item.disabled}
                    />
                </div>)
            }
            return (<el-date-picker
                {...vueAttrs}
                size={'default'}
                style={{width: "100%"}}
                v-model={formData[item.key]}
                unlink-panels={true}
                value-format={'YYYY-MM-DD HH:mm:ss'}
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                disabled={item.disabled}
            />);
        }
    }, //日期时间选择
    dateTimeRange: {
        generate(item, formData, vueAttrs) {
            if (item.isSmall) {
                let swapTime = () => {
                    if (formData[item.key][0] > formData[item.key][1]) {
                        [formData[item.key][0], formData[item.key][1]] = [formData[item.key][1], formData[item.key][0]]
                    }
                }
                return (<div class="isSmallForm">
                    <el-date-picker
                        {...vueAttrs}
                        onBlur={swapTime}
                        type="datetime"
                        v-model={formData[item.key][0]}
                        value-format={'YYYY-MM-DD HH:mm:ss'}
                        placeholder="开始日期"
                        disabled={item.disabled}
                    />
                    至
                    <el-date-picker
                        {...vueAttrs}
                        onBlur={swapTime}
                        type="datetime"
                        v-model={formData[item.key][1]}
                        value-format={'YYYY-MM-DD HH:mm:ss'}
                        placeholder="结束日期"
                        disabled={item.disabled}
                    />
                </div>)
            }
            return (<el-date-picker
                {...vueAttrs}
                style={{width: "100%"}}
                v-model={formData[item.key]}
                unlink-panels={true}
                value-format={'YYYY-MM-DD HH:mm:ss'}
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                disabled={item.disabled}
                default-time={item["default-time"] || null}
            />);
        }
    }, checkbox: {
        generate(item, formData, vueAttrs) {
            return (<el-checkbox-group
                {...vueAttrs}
                v-model={formData[item.key]}
                disabled={item.disabled}
            >
                {(Array.isArray(item.options) ? item.options : []).map(option => {
                    return (<el-checkbox
                        label={option.key || option.value}
                        key={option.key || option.value}
                        value={option.key || option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </el-checkbox>);
                })}
            </el-checkbox-group>);
        }
    }, cascader: {
        generate(item, formData, vueAttrs) {
            return (<el-cascader
                {...vueAttrs}

                options={typeof item.options === "function" ? [] : item.options}
                v-model={formData[item.key]}

                placeholder={item.placeholder}
                disabled={item.disabled}
            />);
        }
    }, switch: {
        generate(item, formData, vueAttrs) {
            // active-color="#13ce66"
            return [<el-switch
                {...vueAttrs}
                v-model={formData[item.key]}

                disabled={item.disabled}
            />, item.options ? (<span style="padding: 0 0 0 10px;font-size: 13px;vertical-align: bottom;">
                        {(item.props && item.props.activeValue ? value === item.props.activeValue : value) ? item.options[1] : item.options[0]}
                    </span>) : null];
        }
    },

};

export function generateFormItem(item, formData) {
    let formItem = null
    let itemType = item.type || "input"
    let formTypeGenerator = formTypeGeneratorMap[itemType]

    if (!formTypeGenerator) {
        return null;
    }

    let vueAttrs = {};

    ["on", "class", "attrs", "style"].forEach(key => {
        if (item[key]) {
            vueAttrs[key] = {...item[key]};
            if (key == 'on') {
                //jsx绑定on事件需要on+事件(开头大写),比如onChange,onClick等
                ["blur", "focus", "change", "input", "clear", "click"].forEach(v => {
                    if (vueAttrs[key][v]) {
                        vueAttrs["on" + v[0].toUpperCase() + v.slice(1)] = vueAttrs[key][v]
                        delete vueAttrs[key][v]
                    }
                })
                delete vueAttrs['on']
            } else if (key == 'attrs') {
                //解构传入的attrs属性
                vueAttrs = {...vueAttrs, ...vueAttrs['attrs']}
                delete vueAttrs['attrs']
            }
        }
    });

    formItem = formTypeGenerator.generate(item, formData, vueAttrs,);

    return formItem;
}
