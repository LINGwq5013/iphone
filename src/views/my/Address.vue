
<template>
  <div class="children1" id="keyboard1">
    <header-top :title="headtxt" :left="true" :right="false"></header-top>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        :show-area="show"
        :address-info="form"
        :tel-maxlength="11"
        :show-set-default="show1"
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import Headertop from "../../components/header.vue";
import { mapState, mapMutations } from "vuex";
import { areaList } from "@vant/area-data";
import Vue from "vue";
import { AddressEdit } from "vant";
// import { getLev1,getLev2,getLev3}  from '../../until/try'
Vue.use(AddressEdit);
export default {
  data() {
    return {
      headtxt: "添加地址",
      areaList,
      show: true,
      show1: true,
      addressid: "",
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
      select: false,
    };
  },
  components: {
    "header-top": Headertop,
  },
  computed: {
    ...mapState(["addresses"]),
  },
  watch: {},
  created() {
    
    this.$nextTick(() => {
      let h =
      document.documentElement.clientHeight || document.body.clientHeight;
      let box = document.getElementById("keyboard1");
      box.style.height = h + "px";
    });
    if (this.$route.query.id) {
      let id = this.$route.query.id;
      this.headtxt = "修改地址";
      this.addresses.forEach((item) => {
        if (item.id == id) {
          Object.keys(this.form).forEach((item1) => {
            this.form[item1] = item[item1];
            this.form.addressDetail = item.address;
          });
        }
        this.show = false;
        this.show1 = false;
      });
      let quhao = this.form.addressDetail.substr(6, 3);
      let shenghao = this.form.addressDetail.substr(0, 3);
      let cityhao = this.form.addressDetail.substr(3, 3);
      console.log(quhao)
      console.log(shenghao)
      console.log(cityhao)
    }
    if (this.$route.query.double) {
      this.double = true;
      this.show1 = false;
    }
  },
  methods: {
    ...mapMutations(["Addresslist", "Changeaddresslist"]),
    onSave(val) {
      if (this.$route.query.id) {
        if (this.show) {
          Object.keys(this.form).forEach((item1) => {
            this.form[item1] = val[item1];
            this.form.address =
              val.province + val.city + val.county + val.addressDetail;
          });
          this.Changeaddresslist(this.form);
        } else {
          Object.keys(this.form).forEach((item1) => {
            this.form[item1] = val[item1];
            this.form.address = val.addressDetail;
          });
          this.Changeaddresslist(this.form);
        }
      } else {
        if (this.addresses.length > 0) {
          let lis = [];
          for (var i = 0; i < this.addresses.length; i++) {
            lis.push(this.addresses[i].id);
          }
          let adid = Math.max.apply(null, lis);
          this.addressid = adid + 1;
        } else {
          this.addressid = 1;
        }
        Object.keys(this.form).forEach((item1) => {
          this.form[item1] = val[item1];
          this.form.address =
            val.province + val.city + val.county + val.addressDetail;
          this.form.id = String(this.addressid);
        });
        setTimeout(() => {
          this.Addresslist(this.form);
        }, 100);
      }
      setTimeout(() => {
        if (this.$store.state.push) {
          this.$router.go(-1);
          if (this.double) {
            this.$router.push({
              name: "addresses",
              query: {
                double: true,
              },
            });
          } else {
            this.$router.push("/addresses");
          }
        }
      }, 250);
    },
    onChangeDetail(val) {
      if (val == "") {
        this.show = true;
      }
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
  box-sizing: border-box;
}
</style>