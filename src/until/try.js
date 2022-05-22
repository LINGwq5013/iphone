/*
 * @Author: your name
 * @Date: 2022-01-11 20:49:39
 * @LastEditTime: 2022-01-11 21:24:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \iphone\src\until\try.js
 */
import { areaList } from "@vant/area-data";

export const areaList1 = areaList

areaList1.getLev1 = function() {
    for (var t = [], e = 1; e < 100; e++) {
        var i = "0000";
        i = e < 10 ? "0" + e + i : e + i;
        var n = this[i];
        "undefined" != typeof n && t.push({
            id: i,
            text: n[0]
        })
    }
    return t
  }
  
  areaList1.getLev2 = function(t) {
    if ("" == t)
        return [];
    for (var e = [], i = 1; i < 100; i++) {
        var n = t.substr(0, 2);
        n += i < 10 ? "0" + i + "00" : i + "00";
        var r = this[n];
        "undefined" != typeof r && e.push({
            id: n,
            text: r[0]
        })
    }
    return e
  }
  
  areaList1.getLev3 = function(t) {
    if ("" == t)
        return [];
    for (var e = [], i = 1; i < 100; i++) {
        var n = t.substr(0, 4);
        n += i < 10 ? "0" + i : i;
        var r = this[n];
        "undefined" != typeof r && e.push({
            id: n,
            text: r[0]
        })
    }
    return e
  }


