
<template>
  <div>
    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <transition
          name="drop"
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.show">
            <!-- 最终位置在css(ball)设定 -->
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balls: [
        // 要执行动画时的显示的小球,一个以上就行(因为下面用到长度)，另外一种balls:【】可以直接空（js:  var  gg={ show:true } this.balls=[...gg]）
        
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
      ],
      dropBalls: [],
    };
  },
  methods: {
    drop(el) {
      // 找到所有隐藏的小球设置成true
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          // var  gg={ show:true } this.balls=[...gg]
          ball.show = true;
          ball.el = el; // 存入当前的dom元素，以便动画函数里面使用
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length; // 拿到所有要做动画的小球
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect(); // 浏览器的接口，返回的是一个矩形的四个值


          let x = parseInt(window.innerWidth - window.innerWidth * 0.6 - 20);
          // x,y是点击地方相对终点的距离
          let y = -(window.innerHeight - rect.top - 45);
          el.style.display = ""; // 显示小球
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webktiTransform = `transform3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el, done) {
      // enter 和leave中必须使用done，否则动画过渡会立即完成，就是要告诉vue什么时候动画结束了的意思
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight; // 触发浏览器重绘，才能隐藏动画过后的小球
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webktiTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        el.addEventListener("transitionend", done); // transitionend css3 提供事件，监听transition的结束
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift(); // 移除动画结束之后的小球
      if (ball) {
        ball.show = false; // 重置小球的状态
        el.style.display = "none";
      }
    },
  },
};
</script>

<style lang="less" >
.ball-container {
  .ball {
    position: absolute;
    right: 40%;
    bottom: 1rem;
    z-index: 999;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41); // 小球的动画使用贝塞尔曲线
    .inner {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: rgb(0, 160, 220);
      transition: all 0.4s linear;
    }
  }
}
</style>


