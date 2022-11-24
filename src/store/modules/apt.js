import { getSido, getGugun, getDong } from "@/api/apt";

const AptStore = {
  namespaced: true,
  state: {
    sido: "",
    gugun: "",
    dong: "",
    sidoList: [],
    gugunList: [],
    dongList: [],
    regcode: "",

    sideX: 0,
    target: null,
    place: {
      MT1: false,
      CS2: false,
      SC4: false,
      SW8: false,
      CT1: false,
      CE7: false,
      HP8: false,
    },

    // TODO : add filtering state
    keyword: "",
    minarea: -1,
    maxarea: -1,
    mindeal: -1,
    maxdeal: -1,
  },
  getters: {},
  mutations: {
    SET_SIDE_X(state, val) {
      state.sideX = val;
    },
    SET_TARGET(state, val) {
      state.target = val;
    },
    SET_PLACE(state, val) {
      state.place = val;
    },
    SET_REGCODE(state, val) {
      state.regcode = val;
    },
    SET_SIDO(state, val) {
      if (!val) val = "";
      state.sido = val;
    },
    SET_GUGUN(state, val) {
      if (!val) val = "";
      state.gugun = val;
    },
    SET_DONG(state, val) {
      if (!val) val = "";
      state.dong = val;
    },
    SET_SIDO_LIST(state, arr) {
      if (!arr) arr = [];
      state.sidoList = arr;
    },
    SET_GUGUN_LIST(state, arr) {
      if (!arr) arr = [];
      state.gugunList = arr;
    },
    SET_DONG_LIST(state, arr) {
      if (!arr) arr = [];
      state.dongList = arr;
    },
    SET_FILTER(state, data) {
      state.keyword = data.keyword;
      state.minarea = data.minarea;
      state.maxarea = data.maxarea;
      state.mindeal = data.mindeal;
      state.maxdeal = data.maxdeal;
    },
  },
  actions: {
    setSideX(context, x) {
      context.commit("SET_SIDE_X", x);
    },
    setTarget(context, target) {
      context.commit("SET_TARGET", target);
    },
    setPlace(context, place) {
      context.commit("SET_PLACE", place);
    },
    /************* 지역 변경 메서드 **************/
    async setAddress(context, data) {
      context.commit("SET_SIDO", data.address[0]);
      context.commit("SET_GUGUN", data.address[1]);
      context.commit("SET_DONG", data.address[2]);
      context.dispatch("setGugunList", data.code.concat().slice(0, 2));
      context.dispatch("setDongList", data.code.concat().slice(0, 5));
    },
    // 광역시/도 변경 메서드
    setSido(context, data) {
      // 변경한 값 설정
      if (data) context.commit("SET_REGCODE", data.code);
      context.commit("SET_SIDO", data?.text);
      context.dispatch("setGugunList", data?.code);
      context.dispatch("setGugun");
    },

    // 시/구/군 변경 메서드
    setGugun(context, data) {
      if (data) context.commit("SET_REGCODE", data.code);
      context.commit("SET_GUGUN", data?.text);
      context.dispatch("setDongList", data?.code);
      context.dispatch("setDong");
    },

    // 동/읍/면 변경 메서드
    setDong(context, data) {
      if (data) context.commit("SET_REGCODE", data.code);
      context.commit("SET_DONG", data?.text);
    },

    /************** 지역 목록 메서드 **************/
    // 광역시/도 목록 메서드
    setSidoList(context) {
      const success = (res) => {
        context
          .dispatch("setOptList", res.data)
          .then((data) => context.commit("SET_SIDO_LIST", data));
      };
      const fail = (error) => {
        console.log(error);
      };

      getSido(success, fail);
    },

    // 시/구/군 목록 메서드
    setGugunList(context, val) {
      const success = (res) => {
        context
          .dispatch("setOptList", res.data)
          .then((data) => context.commit("SET_GUGUN_LIST", data));
      };
      const fail = (error) => {
        console.log(error);
      };

      getGugun(val, success, fail);
    },

    // 동/읍/면 목록 메서드
    setDongList(context, val) {
      const success = (res) => {
        context
          .dispatch("setOptList", res.data)
          .then((data) => context.commit("SET_DONG_LIST", data));
      };
      const fail = (error) => {
        console.log(error);
      };

      getDong(val, success, fail);
    },

    /************** ETC **************/
    // option box에 넣기 위해 속성값 변경
    setOptList(context, data) {
      for (let item of data) {
        item.text = item.name;
        delete item.name;
      }
      return data;
    },

    // 필터 설정
    setFilter(context, data) {
      context.commit("SET_FILTER", data);
    }
  },
  modules: {},
};

export default AptStore;
