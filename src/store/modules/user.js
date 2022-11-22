import { getUserInfo, login, regist } from "@/api/user";

const UserStore = {
  namespaced: true,
  state: {
    userInfo: null,
    registerModal: false,
    loginModal: false,
  },
  getters: {},
  mutations: {
    SET_REGISTER_MODAL(state, bool) {
      state.registerModal = bool;
    },
    SET_LOGIN_MODAL(state, bool) {
      state.loginModal = bool;
    },
    LOGOUT(state) {
      state.userInfo = null;
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    setRegisterModal(context, bool) {
      context.commit("SET_REGISTER_MODAL", bool);
    },
    setLoginModal(context, bool) {
      context.commit("SET_LOGIN_MODAL", bool);
    },
    async register(context, user) {
      const callback = (res) => {
        if (res.status == 200) {
          alert("회원가입이 완료되었습니다! 이메일을 확인해주세요");
          context.commit("SET_REGISTER_MODAL", false);
        } else {
          alert("회원가입에 실패하였습니다! 1");
        }
      };

      const fail = (res) => {
        console.log(res);
        alert("회원가입에 실패하였습니다! 2");
      };

      regist(user, callback, fail);
    },
    async login(context, user) {
      // TODO: 요청 전 input validation check 필요

      const callback = (res) => {
        // 로그인 성공
        if (res.status == 200) {
          context.commit("SET_USER_INFO", res.data.userInfo, res.data["access-token"]);
          sessionStorage.setItem("access-token", res.data["access-token"]);
          // sessionStorage.setItem("refresh-token", res.data["refresh-token"]);
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
      };
      const fail = (error) => {
        console.log(error);
      };

      await login(user, callback, fail);
    },
    async logout(context) {
      context.commit("LOGOUT");
      alert("로그아웃되었습니다!");
    },
    async userCheck() {
      console.log("userCheck");
      const resolve = (res) => {
        console.dir(res);
      };
      const reject = (error) => {
        console.log(error);
      };
      getUserInfo(resolve, reject);
    },
  },
  modules: {},
};

export default UserStore;
