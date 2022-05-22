/*
 * @Author: your name
 * @Date: 2021-10-30 17:05:17
 * @LastEditTime: 2022-03-14 13:05:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%
 * @FilePath: \iphone\babel.config.js
 */

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    // vant按需加载,需要npm i babel-plugin-import -D
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
