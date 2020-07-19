import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/http/index.js";
import utils from "@/utils/utils.js";
const packageConfig = require("../../package.json");
import {
  Toast
} from 'mint-ui';
Vue.use(Vuex)

// var serverNetwork = require("./data/serverNetwork.json");

// var serverSystem = require("./data/serverSystem");

// var sportsList = require("./data/sportsList.json");

// var newsFlash = require("./data/newsFlash.json");

// var newsConfig = {
//   type: "flash"
// }
var user = {
  username: utils.getCookie("username"),
  email: utils.getCookie("email"),
}

var system = {
  version: packageConfig.version
}

export default new Vuex.Store({
  state: {
    apiData: {},
    user,
    system,

  },
  mutations: {
    SetApi(state, data) {
      Vue.set(state.apiData, data.apiName, data.data)
    },
    SetUser(state, user) {
      state.user = user;
      http.headers.token = user.token;
    }
  },
  actions: {
    GetApi(store, api) {
      let apiName = api;
      let getData = {};
      if (typeof api == "object") {
        apiName = api.name;
        getData = api.data;
      }
      return new Promise((resolve, reject) => {
        http.get(apiName, getData).then(res => {
          if (res.code == 200) {
            store.commit("SetApi", {
              apiName: apiName,
              data: res.data
            });
            resolve(res);
          } else {
            Toast(res.error);
            reject(res);
          }
        }).catch((err) => {
          reject(err);
        })
      })
    }
  }
})