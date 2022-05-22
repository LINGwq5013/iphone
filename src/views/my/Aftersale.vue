<!--
 * @Author: your name
 * @Date: 2021-11-13 20:41:51
 * @LastEditTime: 2022-02-08 20:21:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \iphone\src\views\my\Aftersale.vue
-->

<template>
  <div class="children">
       售后服务
       <a :href="imgs"  download >111</a>
  </div>
</template>

<script>
export default {
   data() {
     return {
       imgs:require('../../assets/img/1.jpg')
     }
   },
}
</script>

<style>

</style>