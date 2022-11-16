<template>
  <header class="drag-block">
    <nav class="top-nav">
      <div class="nav-logo">
        <router-link to="/">HOME:IN</router-link>
      </div>

      <div class="nav-container">
        <router-link to="/about">서비스소개</router-link>
        <router-link to="/apt">실거래가</router-link>
        <router-link to="/news">부동산뉴스</router-link>
        <router-link to="/notice">공지사항</router-link>
        <router-link to="/user">마이페이지</router-link>
      </div>

      <div v-if="userInfo()" class="nav-user member">
        <span class="user-name"><b>{{ userInfo().name }}</b>님</span>
        <font-awesome-icon icon="fa-regular fa-user" class="profile" />
        
        <round-button text="로그아웃" @event="logout"></round-button>
      </div>
      <div v-else class="nav-user non-member">
        <round-button text="회원가입" type="line" @event="move"></round-button>
        <round-button text="로그인" @event="setLoginModal(true)"></round-button>
      </div>
    </nav>

    <login-modal v-if="loginModal()" />
  </header>
</template>

<script>
import RoundButton from "@/components/common/RoundButton";
import LoginModal from "@/components/user/LoginModal";
import { mapState, mapActions } from "vuex";

export default {
  name: "TopNav",
  data() {
    return {
      ...mapState(["loginModal", "userInfo"]),
    };
  },
  components: { RoundButton, LoginModal },
  methods: {
    ...mapActions(["setLoginModal", "logout"]),
    move() {
      console.log("move");
    },
  },
  computed: {
    getUserInfo() {
      return this.userInfo();
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--gray);
}
.top-nav {
  width: 1080px;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: left;
  align-items: center;
}
.nav-logo a {
  color: var(--navy);
  margin: auto 10px;
  font-size: 21px;
  font-weight: 900;
  text-decoration: none;
  line-height: 50px;
}
.nav-container {
  margin-left: 80px;
}
.nav-container a {
  color: var(--black);
  margin: auto 10px;
  padding: 10px;
  font-size: 14px;
  text-decoration: none;
  line-height: 50px;
}

.nav-container a.router-link-exact-active {
  font-weight: bolder;
  color: var(--navy);
  transform: scale(105%);
}
.nav-container a:hover {
  font-weight: bolder;
  color: var(--navy);
  transform: scale(105%);
}
/* .nav-container a.router-link-exact-active::before {
  content: "";
  position: absolute;
  background-color: var(--navy);
  opacity: 10%;
  margin-top: 5px;
  margin-left: -10px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
} */
.nav-user {
  flex: auto;
  display: flex;
  justify-content: right;
  align-items: center;
}
.nav-user.non-member > * {
  margin-left: 10px;
}
.profile {
  background-color: var(--gray);
  padding:8px;
  font-size: 13px;
  color: var(--darkgray);
  border-radius: 50%;
  /* margin-right: 5px; */
  margin-right: 20px;
}
.user-name {
  margin-right: 5px;
  font-size: 12px;
}
</style>
