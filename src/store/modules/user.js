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
      // 아이디 체크
      let regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
      if (!regExp.test(user.id)) {
        alert("아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자로 작성해주세요.");
        return;
      }

      // 비밀번호 체크
      regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
      if (!regExp.test(user.pass)) {
        alert("비밀번호는 8~16 영문, 숫자조합으로 작성해주세요.");
        return;
      }

      // 이메일 체크
      regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (!regExp.test(user.email)) {
        alert("이메일 형식을 체크해주세요!");
        return;
      }

      // 전화번호 체크
      regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
      if (!regExp.test(user.phone)) {
        alert("전화번호 양식을 지켜주세요. (010-0000-0000)");
        return;
      }

      const callback = (res) => {
        if (res.status == 200) {
          alert("회원가입이 완료되었습니다! 이메일을 확인해주세요");
          context.commit("SET_REGISTER_MODAL", false);
        }
      };
      const fail = (res) => {
        console.log(res);
        alert("이미 존재하는 아이디 입니다!");
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
        // 이메일 인증 미진행 시
        else if (res.status == 205) {
          alert("이메일 인증을 해주세요!");
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
