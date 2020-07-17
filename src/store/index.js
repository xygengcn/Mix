import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/http/index.js";
import utils from "@/utils/utils.js";
const packageConfig = require("../../package.json");
import {
  Toast
} from 'mint-ui';
Vue.use(Vuex)

var serverNetwork = require("./data/serverNetwork.json");

//var serverSystem = require("./data/serverSystem");

var sportsList = require("./data/sportsList.json");

var newsFlash = require("./data/newsFlash.json");

var newsConfig = {
  type: "flash"
}
var user = {
  username: utils.getCookie("username"),
  email: utils.getCookie("email"),
}

var system = {
  version: packageConfig.version
}

export default new Vuex.Store({
  state: {
    serverNetwork: null,
    newsFlash: null,
    newsConfig,
    soccerList: {},
    one: null,
    bing: null,
    today: null,
    user,
    system,
    apiTotal: null


  },
  mutations: {
    SetNewsFlash(state, data) {
      state.newsFlash = data
    },
    SetSoccerList(state, data) {
      state.soccerList = data
    },
    SetServerNetwork(state, data) {
      state.serverNetwork = data
    },
    SetUser(state, user) {
      state.user = user;
      http.headers.token = user.token;
    },
    SetOne(state, one) {
      state.one = one;
    },
    SetBing(state, bing) {
      state.bing = bing;
    },
    SetToday(state, today) {
      state.today = today;
    },
    SetApiTotal(state, total) {
      state.apiTotal = total;
    }
  },
  actions: {
    GetNewsFlash(store) {
      return new Promise((resolve, reject) => {
        http.get("news").then(res => {
          if (res.code == 200) {
            store.commit("SetNewsFlash", res.data);
            resolve(res);
          } else {
            Toast(res.error);
            reject(res);
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    GetServerNetwork(store) {
      return new Promise((resolve, reject) => {
        http.get("serverNetwork").then(res => {
          if (res.code == 200) {
            store.commit("SetServerNetwork", res.data);
            resolve(res);
          } else {
            reject(res);
            Toast(res.error);
          }
        }).catch((err) => {
          Toast("请求失败");
          reject(err);
        })
      })
    },
    GetSoccerList(store) {
      return new Promise((resolve, reject) => {
        http.get("soccerList", {
          start: utils.time(new Date(), "yyyy-MM-dd 00:00:00next")
        }).then(res => {
          if (res.code == 200) {
            store.commit("SetSoccerList", res.data);
            resolve(res);
          } else {
            Toast(res.error);
            reject(res);
          }
        }).catch((err) => {
          Toast("请求失败");
          reject(err);
        })
      })
    },
    GetOne(store) {
      return new Promise((resolve, reject) => {
        http.get("one").then(res => {
          if (res.code == 200) {
            store.commit("SetOne", res.data);
            resolve(res);
          } else {
            Toast(res.error);
            reject(res);
          }
        }).catch((err) => {
          Toast("请求失败");
          reject(err);
        })
      })
    },
    GetBing(store) {
      return new Promise((resolve, reject) => {
        http.get("bing").then(res => {
          if (res.code == 200) {
            store.commit("SetBing", res.data);
            resolve(res);
          } else {
            Toast(res.error);
            reject(res);
          }
        }).catch((err) => {
          Toast("请求失败");
          reject(err);
        })
      })
    },
    GetToday(store) {
      return new Promise((resolve, reject) => {
        http.get("date").then(res => {
          if (res.code == 200) {
            store.commit("SetToday", res.data);
            resolve(res);
          } else {
            Toast(res.error);
            reject(res);
          }
        }).catch((err) => {
          Toast("请求失败");
          reject(err);
        })
      })
    },
    GetApiTotal(store) {
      return new Promise((resolve, reject) => {
        http.get("apiTotal").then(res => {
          if (res.code == 200) {
            store.commit("SetApiTotal", res.data);
            resolve(res);
          } else {
            Toast(res.error);
            reject(res);
          }
        }).catch((err) => {
          Toast("请求失败");
          reject(err);
        })
      })
    }
  },
  modules: {}
})