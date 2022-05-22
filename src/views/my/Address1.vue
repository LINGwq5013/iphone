<!--
 * @Author: your name
 * @Date: 2022-01-11 16:49:10
 * @LastEditTime: 2022-01-11 21:24:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \iphone\src\views\my\Addresses1.vue
-->
<template>
  <div class="children1" id="keyboard1">
    <header-top :title="headtxt" :left="true" :right="false"></header-top>
    <div class="content">
      2222
      <!-- <van-address-edit
        class="edit"
        :area-list="areaList"
        :address-info="addressInfo"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      /> -->
      <!-- <van-address-edit
        :area-list="areaList"
        :show-area="show"
        :address-info="form"
        :tel-maxlength="11"
        :show-set-default="show1"
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-detail="onChangeDetail"
      /> -->
    </div>
  </div>
</template>

<script>
import Headertop from "../../components/header.vue";
import { mapState, mapMutations } from "vuex";
import { tdist } from "./../../until/utils";
import Vue from "vue";
import { AddressEdit } from "vant";
Vue.use(AddressEdit);
export default {
  data() {
    return {
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      headtxt: "",
      searchResult: [],
      type: "add",
      addressId: "",
      addressInfo: {},
      form: {
        id: "",
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        isDefault: false,
        isSwipe: false,
      },
    };
  },
  components: {
    "header-top": Headertop,
  },
  computed: {
    ...mapState(["addresses"]),
  },
  mounted() {
    if (this.$route.query.id) {
      let _province_list = {};
      let _city_list = {};
      let _county_list = {};
      tdist.getLev1().forEach((p) => {
        _province_list[p.id] = p.text;
        tdist.getLev2(p.id).forEach((c) => {
          _city_list[c.id] = c.text;
          tdist.getLev3(c.id).forEach((q) => (_county_list[q.id] = q.text));
        });
      });
      this.areaList.province_list = _province_list;
      this.areaList.city_list = _city_list;
      this.areaList.county_list = _county_list;

      console.log(this.areaList);
      let id = this.$route.query.id;
      this.headtxt = "修改地址";

      this.addresses.forEach((item) => {
        if (item.id == id) {
          Object.keys(this.form).forEach((item1) => {
            this.form[item1] = item[item1];
            this.form.addressDetail = item.address;
          });
        }
      });
      let _areaCode = "";
      let quhao = this.form.addressDetail.substr(6, 3);
    //   省号substr(0, 2)是因为直辖市，如北京，上海只有两个字，所以下面用includes()
      let shenghao = this.form.addressDetail.substr(0, 2);
      let cityhao = this.form.addressDetail.substr(3, 3);
      console.log(quhao);
      console.log(shenghao);
      console.log(cityhao);
      const province = tdist.getLev1();
      Object.entries(this.areaList.county_list).forEach(([id, text]) => {
        //   quhao 是区或县级市
        if (text == quhao) {
          console.log("22222");
          // 找到区对应的几个省份
          const provinceIndex = province.findIndex(
            (item) => item.id.substr(0, 2) == id.substr(0, 2)
          );
          // 找到区对应的几个市区
          const cityItem = Object.entries(this.areaList.city_list).filter(
            ([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4)
          )[0];
          // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名,shenghao是省，cityhao是市
          if (
            province[provinceIndex].text.includes(shenghao) &&
            cityItem[1] == cityhao
          ) {
            _areaCode = id;
            console.log(_areaCode);
          }
        }
      });
    }
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
  box-sizing: border-box;
}
</style>

