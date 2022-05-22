<!--
 * @Author: ling 1039137893@qq.com
 * @Date: 2022-05-07 21:47:26
 * @LastEditors: ling 1039137893@qq.com
 * @LastEditTime: 2022-05-08 18:57:49
 * @FilePath: \iphone\src\views\home\test1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="test2" id="keyboard1">
     <div class="top" @click="goback()">test2（内容不超过，所以底部不弹起）(如果设置了resize里面的document.activeElement.scrollIntoView()，底部1也弹起)</div>
     <div class="main">main</div>
     <div class="keyboard">
         <input  placeholder="测试"  v-model="msg"  />
     </div>
     <div class="last">
          dibu
     </div>
     <div>
       底部1
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg:""
    }
  },
  created(){
     this.$nextTick(() => {
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let box = document.getElementById("keyboard1");
      box.style.height = h + "px";
    });

  },
  methods:{
    goback(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="less" scoped>
.test2 {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 999;
  overflow: hidden;
}
.top{
  position: relative;
  width: 100%;
  height: 100px;
}
.main{
  position: relative;
  width: 100%;
  height: 300px;
}
.keyboard{
  position: relative;
  width: 100%;
  height: 100px;
}
.last{
  width: 100%;
  height: 100px;
}
</style>