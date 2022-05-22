
import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from "vant";

Vue.use(Toast);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localcity: "",
    user: {
      username: "",
      password: "",
      usersign: '',
      useraccount: "",
      useravatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
      usersex: "",
      focus: 0,
      fan: 0
    },
    address: {},
    address1: {},
    addresses: [
      {
        id: '1',
        name: '张三',
        tel: '13692498096',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: false,
        isSwipe: false,
      },
      {
        id: '2',
        name: '李四',
        tel: '18707649575',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
        isSwipe: false,
        isDefault: false,
      },
    ],
    double: false,
    chosenAddressId: "",
    shopcart: [],
    orders: [],
    order: {},
    collection: [],
    cartindex: -1,
    limit: 8,
    cartPrice: 0,
    cartNumber: 0,
    push: true
  },
  getters: {
    cartPrice(state) {
      let nums1 = 0;
      state.shopcart.forEach((item) => {
        if (item.check) {
          nums1 += item.number * item.price;
        }
      });
      state.cartPrice = nums1
      return nums1;
    },
    orders(state) {
      return state.orders
    },
    cartNumber(state) {
      let nums2 = 0;
      state.shopcart.forEach((item) => {
        if (item.check) {
          nums2 += item.number;
        }
      });
      state.cartNumber = nums2
      return nums2;
    },
    Checkfoods(state) {
      let checkGoods = [];
      for (let i = 0; i < state.shopcart.length; i++) {
        const temp = state.shopcart[i];
        if (temp.check) {
          checkGoods.push(temp);
        }
      }
      return checkGoods;
    },
    getIsAllCheck(state) {
      // 判断是否全选
      let isAllCheck = true;
      for (let i = 0; i < state.shopcart.length; i++) {
        const temp = state.shopcart[i];
        // 只要有一个商品没有勾选立即return false;
        if (!temp.check) {
          isAllCheck = false;
          return isAllCheck;
        }
      }
      return isAllCheck;
    },
    double(state) {
      return state.double
    }
  },
  mutations: {
    Refreshcity(state, data) {
      state.localcity = data
    },
    // 更新信息
    Refreshuser(state, data) {
      state.user = data
    },
    Refreshcollection(state, data) {
      state.collection = data
    },
    Refreshorder(state, data) {
      state.order = data
    },
    Refreshaddresses(state, data) {
      state.addresses = data
    },
    Refreshorders(state, data) {
      state.orders = data
    },
    Refreshchoseid(state, data) {
      state.chosenAddressId = data
    },
    Refreshaddress(state, data) {
      state.address = data
    },
    Refreshshopcart(state, data) {
      state.shopcart = data
    },
    Refreshdouble(state, data) {
      state.double = data
    },
    Refreshaddress1(state, data) {
      state.address1 = data
    },

    //   收藏相关
    Savecollection(state, data) {
      state.collection.push(data)
      localStorage.setItem("collection", JSON.stringify(state.collection))
    },
    Cancelcollection(state, id) {
      for (var i = 0; i < state.collection.length; i++) {
        if (state.collection[i].id == id) {
          state.collection.splice(i, 1)
        }
      }
      localStorage.setItem("collection", JSON.stringify(state.collection))
    },
    Changecity(state, data) {
      state.localcity = data
      localStorage.setItem("city", data);
    },
    
    // 地址相关
    Changedouble(state, data) {
      state.double = data
      localStorage.setItem("double", data)
    },
    Detaleaddress(state, data) {
      if (data.isDefault) {
        state.address = {}
        state.chosenAddressId = ''
        localStorage.setItem("choseid", state.chosenAddressId)
        localStorage.setItem("address", JSON.stringify(state.address))
      }

      for (let i = 0; i < state.addresses.length; i++) {
        if (state.addresses[i].id == data.id) {
          state.addresses.splice(i, 1)
        }
      }
      Toast("已删除")
      localStorage.setItem("addresses", JSON.stringify(state.addresses))
    },
    Addresslist(state, data) {
      state.push = true
      for (let i = 0; i < state.addresses.length; i++) {
        const item = state.addresses[i]
        if (item.name == data.name && item.tel == data.tel && item.address == data.address) {
          Toast("已有相同项，请重新修改")
          state.push = false
          break
        }
      }
      setTimeout(() => {
        if (state.push) {
          state.addresses.push(data)
          Toast("添加成功")
          if (data.isDefault) {
            state.chosenAddressId = String(data.id)
            state.addresses.forEach((item) => {
              item.isDefault = false
              if (item.id == state.chosenAddressId) {
                item.isDefault = true
                state.address = item
              }
            })
          }
        }
      }, 100);

      setTimeout(() => {
        localStorage.setItem("choseid", state.chosenAddressId)
        localStorage.setItem("address", JSON.stringify(state.address))
        localStorage.setItem("addresses", JSON.stringify(state.addresses))
      }, 200);
    },
    updateaddress(state, id) {
      state.chosenAddressId = String(id)

      state.addresses.forEach((item) => {
        item.isDefault = false
        if (item.id == id) {
          state.address = item
          item.isDefault = true
        }
      })
      setTimeout(() => {
        localStorage.setItem("choseid", state.chosenAddressId)
        localStorage.setItem("addresses", JSON.stringify(state.addresses))
        localStorage.setItem("address", JSON.stringify(state.address))
      }, 100);
    },
    Adddoubleaddress(state, id) {
      state.addresses.forEach((item) => {
        if (item.id == id) {
          state.address1 = item
          item.isDefault = false
        }
      })
      console.log('www')
      localStorage.setItem("address1", JSON.stringify(state.address1))
    },
    Changeaddresslist(state, data) {
      state.push = true
      for (let i = 0; i < state.addresses.length; i++) {
        const item = state.addresses[i]
        if (item.name == data.name && item.tel == data.tel && item.address == data.address) {
          Toast("已有相同项，请重新修改")
          state.push = false
          break
        }
      }
      setTimeout(() => {
        if (state.push) {
          state.addresses.forEach((item) => {
            if (item.id == data.id) {
              Object.keys(item).forEach((item1) => {
                item[item1] = data[item1];
              });
            }
          });
        }
        localStorage.setItem("addresses", JSON.stringify(state.addresses))
        localStorage.setItem("address", JSON.stringify(state.address))
      }, 100);
    },
    Clearaddress() {
      localStorage.removeItem('address')
      localStorage.removeItem('address1')
      localStorage.removeItem("choseid")
    },
    // 个人信息

    Userquit() {
      localStorage.clear();
    },
    Saveuser(state, data) {
      state.user.username = data.username
      state.user.password = data.password
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    Changeusersign(state, data) {
      state.user.usersign = data
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    Changeuseraccount(state, data) {
      state.user.useraccount = data
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    Changeusersex(state, data) {
      state.user.usersex = data
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    Changeavatar(state, data) {
      state.user.useravatar = data
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    // 购物相关
    checkAll(state, data) {
      for (let i = 0; i < state.shopcart.length; i++) {
        state.shopcart[i].check = data;
      }
      localStorage.setItem("shopcart", JSON.stringify(state.shopcart))
    },
    Changecheck(state, data) {
      state.shopcart[data.index].check = data.value
      localStorage.setItem("shopcart", JSON.stringify(state.shopcart))
    },
    Ordercancel(state, data) {
      let type = 1
      let ordertime = new Date().getTime()
      data.ordertime = ordertime
      data.type = type
      state.orders.unshift(data)
      localStorage.setItem("orders", JSON.stringify(state.orders))
      setTimeout(() => {
        state.order = {}
        localStorage.setItem("order", JSON.stringify(state.order))
        if (state.double) {
          state.double = false
          localStorage.setItem("double", state.double)
          localStorage.removeItem('address1')
        }
      }, 500);
    },
    Ordersubmit(state, data) {
      let type = 2
      let ordertime = new Date().getTime()
      data.ordertime = ordertime
      data.type = type
      state.orders.unshift(data)
      localStorage.setItem("orders", JSON.stringify(state.orders))
      setTimeout(() => {
        state.order = {}
        localStorage.setItem("order", JSON.stringify(state.order))
        if (state.double) {
          state.double = false
          localStorage.setItem("double", state.double)
          localStorage.removeItem('address1')
        }
      }, 500);
    },
    Payment(state, data) {
      state.orders.forEach((item) => {
        if (item.ordertime == data.ordertime && item.address.name == data.address.name) {
          item.type = 2
        }
      })
      localStorage.setItem("orders", JSON.stringify(state.orders))
    },
    Shipment(state, data) {
      state.orders.forEach((item) => {
        if (item.ordertime == data.ordertime && item.address.name == data.address.name) {
          item.type = 3
        }
      })
      localStorage.setItem("orders", JSON.stringify(state.orders))
    },
    Receiption(state, data) {
      state.orders.forEach((item) => {
        if (item.ordertime == data.ordertime && item.address.name == data.address.name) {
          item.type = 4
        }
      })
      localStorage.setItem("orders", JSON.stringify(state.orders))
    },
    Saveshopcart(state, data) {
      state.shopcart.push(data)
      Toast("成功加入购物车");
      localStorage.setItem("shopcart", JSON.stringify(state.shopcart))
    },
    Checkcartxin(state, data) {
      state.cartindex = -1
      for (let i = 0; i < state.shopcart.length; i++) {
        const item = state.shopcart[i]
        if (item.id == data.id && item.materials == data.materials) {
          state.cartindex = i
        }
      }
    },
    Addcartxin(state, data) {
      state.shopcart.push(data)
      Toast("成功加入购物车");
      setTimeout(() => {
        localStorage.setItem("shopcart", JSON.stringify(state.shopcart))
      }, 200);
    },
    Revisecart(state, data) {
      let index = parseInt(data.index)
      let original = state.shopcart[index].number
      let max = parseInt(state.shopcart[index].number += data.number)

      if (max <= state.limit) {
        state.shopcart[index].number == max
        Toast("当前数量为" + max)
      } else {
        state.shopcart[index].number = original
        Toast("限购数量为8,请合理修改");
      }
      setTimeout(() => {
        localStorage.setItem("shopcart", JSON.stringify(state.shopcart))
      }, 200);
    },
    Redureshopnum2(state, num) {
      if (state.shopcart[num].number > 1) {
        state.shopcart[num].number--
      } else {
        state.shopcart.splice(num, 1)
      }
      localStorage.setItem("shopcart", JSON.stringify(state.shopcart))
    },
    Addshopcartnum2(state, num) {
      let max = state.shopcart[num].number + 1
      if (max <= state.limit) {
        state.shopcart[num].number++
        localStorage.setItem("shopcart", JSON.stringify(state.shopcart))
      } else {
        Toast('最大限额为' + state.limit)
        return
      }

    },
    Deleteshopcart(state, id) {
      for (let i = 0; i < state.shopcart.length; i++) {
        const temp = state.shopcart[i];
        if (temp.id == id) {
          state.shopcart.splice(i, 1);
        }
      }
      setTimeout(() => {
        localStorage.setItem("shopcart", JSON.stringify(state.shopcart))
      }, 200);
    },
    Saveorder1(state, data) {
      let lis = []
      lis.push(data)
      state.order.foods = lis
      state.order.cartNumber = data.number
      state.order.cartPrice = data.number * data.price
      localStorage.setItem("order", JSON.stringify(state.order))
    },
    Saveorder(state, data) {
      state.order.foods = data
      state.order.cartNumber = state.cartNumber
      state.order.cartPrice = state.cartPrice
      localStorage.setItem("order", JSON.stringify(state.order))
    },
  },
  actions: {
    Ordercancel({ commit }, data) {
      commit('Ordercancel', data);
    },
    Ordersubmit({ commit }, data) {
      commit('Ordersubmit', data);
    },
  },
  modules: {

  }
})
