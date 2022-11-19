import Vue from "vue";
import Vuex from "vuex";
import http from "@/api/http.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    userInfo: null,
    loginModal: false,
  },
  getters: {},
  mutations: {
    SET_LOGIN_MODAL(state, bool) {
      state.loginModal = bool;
    },
    LOGIN(state, userInfo, accessToken) {
      console.log(userInfo);
      state.userInfo = userInfo;
      state.accessToken = accessToken;
    },
    LOGOUT(state) {
      state.userInfo = null;
      state.accessToken = null;
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
    },
  },
  actions: {
    setLoginModal(context, bool) {
      context.commit("SET_LOGIN_MODAL", bool);
    },
    async login(context, user) {
      // TODO: 요청 전 input validation check 필요

      http.post(`user/login`, user).then((res) => {
        console.log(res);

        // 로그인 성공
        if (res.status == 200) {
          context.commit("LOGIN", res.data.userInfo, res.data["access-token"]);
          context.commit("SET_LOGIN_MODAL", false);
        }
        // 로그인 실패: 잘못된 아이디
        else if (res.status == 204) {
          alert("아이디와 비밀번호를 확인해주세요!");
        }
        // 로그인 실패: 잘못된 요청
        else if (res.status >= 400) {
          alert("잘못된 요청입니다!");
        }
        // 로그인 실패: 서버 에러
        else if (res.status >= 500) {
          alert("요청을 처리할 수 없습니다.\r\n잠시 후 다시 시도해주세요.");
        }
      });
    },
    async logout(context) {
      context.commit("LOGOUT");
      // http.get(`user/logout`).then((res) => {
      //   console.log(res);

      //   // 로그아웃 성공
      //   if (res.status === 200) {
      //     context.commit("LOGOUT");
      //   }
      // });
    },
  },
  modules: {},
});
