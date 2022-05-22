/*
 * @Author: your name
 * @Date: 2021-10-30 17:29:17
 * @LastEditTime: 2022-05-06 11:43:31
 * @LastEditors: ling 1039137893@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \iphone\vue.config.js
 */

const px2rem = require('postcss-px2rem')
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')  // 用于在生成环境剔除debuger和console
const CompressionPlugin = require("compression-webpack-plugin");
// @目录
// config.resolve.alias
function resolve(dir) {
    return path.join(__dirname, dir)//设置绝对路径
}

// 当设定的文本为12px时，相当于 12/remUnit rem ，而rem由rem.js的style.fontSize定义  最后文本的实际font-size为 (rem.js的style.fontSize) x (12/remUnit)
const postcss = px2rem({
    remUnit: 32   
})

module.exports = {
    // lintOnSave: false, //取消严格标准模式
    publicPath: './', //项目上线打包   打包时启用
    // 打包时不生成.map文件
    productionSourceMap: false,
    css: {   // 移动端自适应:css 配置
        loaderOptions: {
            postcss: {
                plugins: [postcss]
            }
        },
    },
    chainWebpack: (config) => {
        // ES6 Promise,而IE浏览器不支持 引入的另外一种引入方式
        // config.entry('main').add('babel-polyfill') 
        const oneOfsMap = config.module.rule("less").oneOfs.store;
        const oneOfsMap1 = config.module.rule("scss").oneOfs.store;
        // 使用less定义css变量 ，@pink:pink;
        oneOfsMap.forEach(item => {
            item
                .use("style-resources-loader")
                .loader("style-resources-loader")
                .options({
                    patterns: "./src/assets/style/idx.less"
                })
                .end()
        })
        // 使用scss定义css变量 ，$blue: #3498db;
        oneOfsMap1.forEach(item => {
            item
                .use("style-resources-loader")
                .loader("style-resources-loader")
                .options({
                    patterns: "./src/assets/style/index.scss"
                })
                .end()
        })
        config.resolve.alias
            .set('@', resolve('src'))
            
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                disable: true, // webpack@2.x and newer
                quality: '65-80',
                speed: 4
            })
            .end()    


    },
    configureWebpack:config => {
        // 为生产环境修改配置...
        if (process.env.NODE_ENV === 'production') {
          // 去除console来减少文件大小，效果同'UglifyJsPlugin'
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
              compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
              }
            }
          })
          // 开启gzip压缩
          config.plugins.push(new CompressionPlugin({
            algorithm: 'gzip',
            test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"), // 匹配文件扩展名
            // threshold: 10240, // 对超过10k的数据进行压缩
            threshold: 5120, // 对超过5k的数据进行压缩
            minRatio: 0.8,
            cache: true, // 是否需要缓存
            deleteOriginalAssets:false  // true删除源文件(不建议);false不删除源文件
          }))
    
        } else {
          // 为开发环境修改配置...
    
        }
      },
    devServer: {
        proxy: {//反向代理
            "/bdapi": {//代理名称
                target: 'https://api.benlai.com',//城市选择
                pathRewrite: {
                    "^/bdapi": ""    //将/bdapi 重写 为 空
                }
            }
        }
    },
}