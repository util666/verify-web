const {defineConfig} = require('@vue/cli-service')

const path = require("path");

const args = require("minimist")(process.argv.slice(2));


//默认本地测试环境
const devProxyTarget = 'http://localhost:3000'


if (args.serve == 'serve') {
    // 直接请求接口
    process.env.VUE_APP_BASEURL = devProxyTarget;
    console.log('本地直接请求接口')
}

if (args.buildModel == 'test') {
    //打包测试环境
    process.env.VUE_APP_BASEURL = 'http://47.98.229.173:3000';
    console.log('打包测试环境')
}

if (args.buildModel == 'prod') {
    //打包生产环境
    console.log('打包生产环境')
}

//后端接口前缀,本地proxy代理
const moduleMap = {
    api: {urlPrefix: "/api"},
    account: {urlPrefix: "/account"},
    program: {urlPrefix: "/program"},

};
const moduleProxy = {}

Object.keys(moduleMap).map(moduleName => {
    let moduleItem = moduleMap[moduleName]
    moduleProxy[moduleItem.urlPrefix] = {
        // pathRewrite: {[`^/${moduleName}`]: ""},
        target: moduleItem.target || devProxyTarget, // ws: true,        //如果要代理 websockets，配置这个参数
        // secure: false,  // 如果是https接口，需要配置这个参数
        // changeOrigin: true,  //是否跨域
    };
})


//时间戳,打包时加到css,js文件名上
// const timeStamp = (new Date()).getTime()


module.exports = defineConfig({
    transpileDependencies: true,
    //打包时不生成map文件
    productionSourceMap: false,
    configureWebpack: {
        // output: {
        //     //导出js文件
        //     filename: `js/[name].${timeStamp}.js`, chunkFilename: `js/[id].${timeStamp}.js`
        // },
        resolve: {
            alias: {
                //重定义src路径
                '@': path.resolve(__dirname, 'src'),
            }
        },
    },
    // css: {
    //     extract: {
    //         //导出css文件
    //         filename: `css/[name].${timeStamp}.css`, chunkFilename: `css/[name].${timeStamp}.css`
    //     },
    // },
    devServer: {
        // open: true,//自动打开浏览器,获取本机IP地址
        // host: require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[0]][1].address,
        port: 8000,
        https: false,
        proxy: {
            ...moduleProxy,
        },
    },
})
