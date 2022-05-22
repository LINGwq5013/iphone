
<template>
  <div class="try">
    <div class="header" @click="dj">产品规格</div>
    <div class="try2">
      <div class="try3"></div>
      <div>333</div>
    </div>
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods_info"
      :goods-id="goods_id"
      :hide-stock="sku.hide_stock"
      :properties="properties"
      :quota="quota"
      :quota-used="quota_used"
      :initial-sku="initialSku"
      reset-stepper-on-hide
      reset-selected-sku-on-hide
      disable-stepper-input
      :close-on-click-overlay="closeOnClickOverlay"
      :custom-sku-validator="customSkuValidator"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Sku } from "vant";

Vue.use(Sku);
export default {
  data() {
    return {
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色",
            k_id: "1",
            v: [
              {
                id: "30349",
                name: "天蓝色",
                imgUrl:
                  "https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg",
              },
              {
                id: "1215",
                name: "白色",
                imgUrl: "https://img01.yzcdn.cn/2.jpg",
              },
              {
                id: "1216",
                name: "黑色",
                imgUrl: "https://img01.yzcdn.cn/2.jpg",
              },
            ],
            k_s: "s1",
            count: 3,
          },
          {
            k: "尺寸",
            k_id: "2",
            v: [
              {
                id: "1193",
                name: "1",
              },
              {
                id: "1194",
                name: "2",
              },
            ],
            k_s: "s2",
            count: 2,
          },
        ],
        list: [
          {
            id: 2259,
            price: 120, //价格
            discount: 122,
            s1: "1215",
            s2: "1193",
            s3: "0",
            s4: "0",
            s5: "0",
            stock_num: 20, //库存
            goods_id: 946755,
          },
          {
            id: 2260,
            price: 110,
            discount: 112,
            s1: "1215",
            s2: "1194",
            s3: "0",
            s4: "0",
            s5: "0",
            stock_num: 2, //库存
            goods_id: 946755,
          },
          {
            id: 2261,
            price: 110,
            discount: 112,
            s1: "1216",
            s2: "1193",
            s3: "0",
            s4: "0",
            s5: "0",
            stock_num: 55, //库存
            goods_id: 946755,
          },
          {
            id: 2262,
            price: 110,
            discount: 112,
            s1: "1216",
            s2: "1194",
            s3: "0",
            s4: "0",
            s5: "0",
            stock_num: 60, //库存
            goods_id: 946755,
          },
          {
            id: 2257,
            price: 130,
            discount: 132,
            s1: "30349",
            s2: "1193",
            s3: "0",
            s4: "0",
            s5: "0",
            stock_num: 40, //库存
            goods_id: 946755,
          },
          {
            id: 2258,
            price: 100,
            discount: 100,
            s1: "30349",
            s2: "1194",
            s3: "0",
            s4: "0",
            s5: "0",
            stock_num: 50, //库存
            goods_id: 946755,
          },
        ],

        price: "5.00", //？？
        stock_num: 227, // 商品总库存？？
        none_sku: false, // 是否无规格商品 false正常显示那些可供选择的标准，此处是颜色和尺寸
        hide_stock: false, // 是否隐藏剩余库存 false正常显示剩余多少件的那个库存
      },
      properties: [
        {
          k_id: 123, // 属性id
          k: "加料", // 属性名
          is_multiple: true, // 是否可多选
          v: [
            {
              id: 1222, // 属性值id
              name: "珍珠", // 属性值名
              price: 1, // 属性值加价
            },
            {
              id: 1223,
              name: "椰果",
              price: 1,
            },
          ],
        },
      ],
      goods_id: "946755",
      quota: 3, //限购数量 库存旁边显示限购数
      quota_used: 0, //已经购买过的数量 和下方的数字选择框显示不一样 与限购数量是相对应的 0数字选择框显示3   1 -- 2   2 -- 1  3 -- 0
      // 未选择颜色是图片
      goods_info: {
        title: "1111",
        picture:
          "https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg",
      },
      showBase: false, //sku的框的显示
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true, //点击空白处关闭购物框
      // 默认选择
      initialSku: {
        s1: "30349",
        s2: "1193",
        selectedNum: 2, //下面的数字选择框的数字即买了多少件
      },
      customSkuValidator: () => {

      }, //？？
    };
  },
  methods: {
    onBuyClicked(sku) {
      console.log(sku)
    },

    onAddCartClicked(sku) {
      this.$toast("add cart:" + JSON.stringify(sku));
    },
    dj() {
      this.showBase = true;
    },
  },
};
</script>

<style lang="less" scoped>
// try 如果是50%，try2就要更大，padding-right与多出一样
/deep/ .van-sku-row {
  text-align: left;
}
/deep/ .van-sku-header__goods-info {
  text-align: left;
}
.try {
  width: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden !important;
}
.header {
  height: 6%;
}
.try2 {
  width: 102%;
  position: absolute;
  top: 6%;
  bottom: 0;
  padding-right: 4%;
  padding-left: 2%;
  box-sizing: border-box;
  overflow-y: scroll;
  background: white;
}
// 这里padding-left为多少，padding-right为原来的加上左边的
.try3 {
  width: 100%;
  height: 900px;
}
</style>