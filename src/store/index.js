import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import AptStore from "@/store/modules/apt.js";
import UserStore from "@/store/modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AptStore,
    UserStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      // storage: sessionStorage,
    }),
  ],
});
