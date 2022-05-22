
<template>
  <div class="login1" id="keyboard" ref="children">
    <header-top :title="headtxt" :left="true"></header-top>
    <div class="content">
      <div class="content-main">
        <van-form validate-first ref="form">
          <van-field
            v-model="LoginUser.username"
            label="手机号"
            placeholder="手机号"
            :rules="[
              { required: true, message: '请填写手机号' },
              {
                pattern: /^[1][3,5,7,8][0-9]{9}$/,
                message: '请输入正确的手机号码',
              },
            ]"
          />
          <van-field
            v-model="LoginUser.password"
            :type="pass"
            label="密码"
            placeholder="密码"
            :rules="rules2"
          >
            <template #button>
              <van-icon
                class="eye"
                v-if="pass == 'password'"
                @click="open"
                name="eye-o"
              />
              <van-icon
                class="eye"
                v-if="pass == 'text'"
                @click="close"
                name="closed-eye"
              />
            </template>
          </van-field>
          <van-field
            class="yanz"
            v-model="LoginUser.regcode"
            label="验证码"
            placeholder="验证码"
            :rules="[{ validator: validateRegcode, trigger: 'blur' }]"
          >
            <template #button>
              <div class="text">
                <canvas class="tp" ref="regcode"></canvas>
              </div>
            </template>
          </van-field>
          <div style="margin: 16px">
            <van-button round block type="info" @click="onSubmit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import Canvas from "vchat-regcode";
import Headertop from "../../components/header.vue";
import Vue from "vue";
import { Form, Toast } from "vant";
import { Field } from "vant";
import { Button } from "vant";

Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
export default {
  data() {
    return {
      headtxt: "密码登录",
      LoginUser: {
        username: "",
        password: "",
        regcode: "",
      },
      regCodeClass: null,
      regcode: "",
      pass: "password",
      rules2: [
        { required: true, message: "请填写密码" },
        {
          pattern: /^[a-zA-Z]\w{4,15}$/,
          message: "字母开头,长度5-16之间,允许字母数字下划线",
        },
      ],
    };
  },
  components: {
    "header-top": Headertop,
  },
  created() {
    this.initRegcode();
    this.$nextTick(() => {
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let box = document.getElementById("keyboard");
      box.style.height = h + "px";
    });
  },
  mounted() {},
  methods: {
    validateRegcode(value) {
      if (value === "") {
        Toast("请输入验证码");
      }
      // if(value.toLowerCase() == this.regcode.toLowerCase()){

      //   this.onSubmit()
      // }
      if (value.toLowerCase() !== this.regcode.toLowerCase()) {
        this.regCodeClass.drawAgain();
        Toast("验证码错误");
        return;
      }
    },
    initRegcode() {
      this.$nextTick(() => {
        this.regCodeClass = new Canvas(this.$refs["regcode"], {
          fontSize: 50,
          lineNum: 2,
          dotNum: 10,
        });
        this.regCodeClass.draw((r) => {
          this.regcode = r;
        });
      });
    },
    async onSubmit() {
      let that = this;
      this.$refs.form
        .validate()
        .then(() => {
          if (
            that.regcode.toLowerCase() == that.LoginUser.regcode.toLowerCase()
          ) {
            that.$store.commit("Saveuser", that.LoginUser);
            setTimeout(() => {
              that.$router.go(-1);
              that.$router.push("/mine");
              that.LoginUser = {};
            }, 100);
            // 后台登录验证
            // that.$axios.post("/api/users/login", {
            //   userName: that.LoginUser.username,
            //   password: this.LoginUser.password,
            // }).then((res) => {
            //   if (res.data.code === "001") {
            //     let user = JSON.stringify(res.data.user);
            //     that.$store.commit("Saveuser", user);
            //     this.$router.push('/mine');
            //     Toast(res.data.msg);
            //   } else {
            //     // 清空输入框的校验状态
            //     this.$refs["form"].resetFields();
            //     // 弹出通知框提示登录失败信息
            //     Toast(res.data.msg);
            //   }
            // })
          }
        })
        .catch(() => {
          Toast.fail("提交失败");
        });
    },
    open() {
      this.pass = "text";
    },
    close() {
      this.pass = "password";
    },
  },
};
</script>

<style lang="less" scoped>
.login1 {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #eee;
  z-index: 999;
}
.content {
  position: absolute;
  top: 6%;
  bottom: 0;
  width: 100%;
  .content-main {
    width: 100%;
    padding: 10px 10px;
    box-sizing: border-box;
    background: white;
  }
}
.eye {
  font-size: 20px;
  margin-right: 10px;
}
.text {
  width: 80px;
  height: 40px;
  position: relative;
  background: turquoise;
  .tp {
    display: inline-block;
    vertical-align: middle;
    width: 80px;
    height: 40px;
  }
}
/deep/ .van-field__label {
  display: flex;
  align-items: center;
}
.yanz {
}
</style>