
<template>
  <div class="welcome" v-if="show">
    <div class="time" @click="pass">
      <div class="text">跳过</div>
      <div class="time1">{{ time }}</div>
    </div>
    <img src="1.jpg" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      time: 3,
      timer: null,
    };
  },
  mounted() {
    
    this.timer = setInterval(() => {
      this.time--;
      if (this.time == 0) {
        clearInterval(this.timer);
        this.show=false
      }
    }, 1000);
  },
  methods:{
      pass(){
          clearInterval(this.timer)
          this.show=false
      }
  }
};
</script>

<style lang="less" scoped>
.welcome {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1000;
}
.welcome img {
  width: 100%;
  height: 100%;
}
.time {
  position: absolute;
  top: 3%;
  right: 5%;
  width: 60px;
  font-size: 15px;
  height: 30px;
  border-radius: 10px;
  background: grey;
  opacity: 0.7;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: white;
  }
  .time1{
      color: orange;
      margin-left: 5px;
      padding-top: 2px;
  }
}
</style>