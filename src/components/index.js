//只引入文件夹名字 是"lt-"开头 内的文件
const requireComponents = require.context(".", true, /lt-.*\.vue$/)

const components = []
requireComponents.keys().forEach((fileName) => {
    // 获取组件配置(组件模板)
    const componentConfig = requireComponents(fileName);
    // 将被注册的组件名字,对获取的组件文件名进行处理
    const componentName = fileName.replace(/^\.\/.*\//, "").replace(/\.vue$/, "");
    components.push([componentName, componentConfig.default])
    // console.log('全局注册组件名字===',componentName)
});

export default components