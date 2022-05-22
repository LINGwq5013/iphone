
<template>
  <div class="children1">
    <header-top :title="headtxt" :left="true" :right="false"></header-top>

    <div class="content">
      <div class="avatar">
        <van-image round class="tp" :src="useravatar" />
        <p class="txt">更换头像和挂件</p>
        <div class="upload" @click="show = true" />
      </div>
      <van-cell-group>
        <van-cell class="name">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="message" @click="username">
              <div class="tis">淘宝账号：</div>
              <div class="name">{{ user.username }}</div>
            </div>
          </template>
          <template #right-icon>
            <van-icon
              name="description"
              :data-clipboard-text="user.username"
              class="message1"
              @click="copy"
            />
          </template>
        </van-cell>
        <van-cell class="name" is-link to="revisename">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="message">
              <div class="tis">淘宝昵称：</div>
              <div class="name">{{ user.useraccount }}</div>
            </div>
          </template>
        </van-cell>
        <van-cell class="name" @click="show2 = true" is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="message">
              <div class="tis">性别：</div>
              <div class="name">{{ user.usersex }}</div>
            </div>
          </template>
        </van-cell>
        <van-cell class="name" to="signature" @click="trt" is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="message">
              <div class="tis">个性签名：</div>
              <div class="name">{{ user.usersign }}</div>
            </div>
          </template>
        </van-cell>

        <van-cell title="我的二维码" is-link />
      </van-cell-group>
    </div>

    <van-popup v-model="show" position="bottom" class="popup">
      <van-button type="default" @click="pendant">更换挂件</van-button>
      <van-button type="default" @click="avatar">更换头像</van-button>
      <van-button type="default" @click="show = false">取消</van-button>
    </van-popup>
    <van-popup v-model="show1" position="bottom" class="popup">
      <van-button type="default" @click="photo">拍照</van-button>
      <van-uploader :before-read="beforeRead" :after-read="afterRead">
        <van-button class="btn1">从相册选择</van-button>
      </van-uploader>
      <van-button type="default" @click="show1 = false">取消</van-button>
    </van-popup>
    <van-popup v-model="show2" position="bottom" class="popup">
      <van-button type="default" @click="man">男</van-button>
      <van-button type="default" @click="female">女</van-button>
      <van-button type="default" @click="show2 = false">取消</van-button>
    </van-popup>
    <van-dialog
      v-model="show3"
      title="图片预览"
      show-cancel-button
      @confirm="photosave"
      @cancel="show3 = false"
    >
      <vue-cropper
        ref="cropper"
        :src="imgSrc"
        style="width: 100%; height: 300px"
      ></vue-cropper>
    </van-dialog>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Headertop from "../../components/header.vue";
import Clipboard from "clipboard";
import { mapState, mapMutations } from "vuex";
import Vue from "vue";
import VueCropper from "vue-cropperjs";
import { Popup } from "vant";
import { Cell, CellGroup } from "vant";
import { Image as VanImage } from "vant";
import { Button } from "vant";
import { Uploader } from "vant";
import { Dialog } from "vant";
import { Toast } from "vant";

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Uploader);
Vue.use(Button);
Vue.use(Popup);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);

export default {
  data() {
    return {
      headtxt: "个人信息",
      show: false,
      show1: false,
      show2: false,
      show3: false,
      imgSrc: "",
      useravatar: "",
    };
  },
  created() {
    setTimeout(() => {
      this.useravatar = this.user.useravatar;
    });
  },
  components: {
    "header-top": Headertop,
    VueCropper,
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["Changeavatar", "Changeusersex"]),

    username() {
      Toast("淘宝账号不支持修改,试试修改昵称");
    },
    copy() {
      let clipboard = new Clipboard(".message1");
      clipboard.on("success", () => {
        Toast.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        Toast({
          message: "手机权限不支持复制功能",
        });
        clipboard.destroy();
      });
    },
    man() {
      let man = "男";
      this.Changeusersex(man);
      Toast.success("修改成功");
      this.show2 = false;
    },
    female() {
      let female = "女";
      this.Changeusersex(female);
      Toast.success("修改成功");
      this.show2 = false;
    },
    trt() {
      this.$router.push("");
    },
    pendant() {
      Toast("该功能暂未实现,更换头像试试");
    },
    avatar() {
      this.show = false;
      this.show1 = true;
    },
    photo() {
      Toast("该功能暂未实现,本地上传试试");
    },
    photosave() {
      this.useravatar = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.Changeavatar(this.useravatar);
      setTimeout(() => {
        Toast("更换头像成功");
        this.show3 = false;
        this.show1 = false;
      }, 200);
    },
    afterRead(file) {
      this.imgSrc = file.content;
      this.$refs.cropper && this.$refs.cropper.replace(file.content);
      this.show3 = true;
    },
    beforeRead(file) {
      if (!file.type.includes("image/")) {
        Toast("请上传图片格式");
        return false;
      }
      let isLt1M = file.size / 1024 / 1024 <= 1;
      if (!isLt1M) {
        Toast("图片大小1M以内");
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  position: absolute;
  top: 6%;
  bottom: 0;
  overflow-y: scroll;
  .avatar {
    position: relative;
    width: 100%;
    height: 160px;
    text-align: center;
    overflow: hidden;
    .tp {
      width: 130px;
      height: 130px;
    }
    .txt {
      margin-top: -5px;
      height: 16px;
      width: 100%;
      text-align: center;
      font-size: 16px;
    }
    .upload {
      position: absolute;
      width: 130px;
      height: 150px;
      top: 0;
      left: 33%;
      opacity: 0;
    }
  }
  .name {
    width: 100%;
    height: 50px;
    .message {
      width: 80%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      .tis {
        width: 100px;
        height: 30px;
        font-size: 0.5rem;
        font-weight: 500;
        line-height: 30px;
      }
      .name {
        width: 200px;
        height: 30px;
        line-height: 30px;
      }
    }
    .message1 {
      float: right;
      text-align: center;
      width: 16px;
      height: 30px;
      font-size: 0.5rem;
      line-height: 30px;
    }
  }
}
.popup {
  width: 100%;
}
/deep/ .van-button {
  width: 100%;
}
/deep/ .van-uploader {
  width: 100%;
}
/deep/ .van-uploader__input-wrapper {
  width: 100%;
}
.btn1 {
  width: 100%;
}
</style>