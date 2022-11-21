<template>
  <div class="container" @click="close" v-show="loginModal">
    <form class="login-form">
      <h2>HOME:IN</h2>
      <checkbox-button class="test" :value="remember" text="아이디 저장" position="left" @event="setRemember" />
      <div class="input-container">
        <text-input icon="user" placeholder="아이디" :value="id" @on-change="setId" />
        <text-input icon="password" placeholder="비밀번호" type="password" :value="pass" @on-change="setPass" />
      </div>
      <a class="forget-password-a">비밀번호를 잊어버리셨나요?</a>
      <button class="login-btn" @click.prevent="onLogin">LOGIN</button>
    </form>
  </div>
</template>

<script>
import CheckboxButton from "../common/CheckboxButton.vue";
import TextInput from "../common/TextInput.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { TextInput, CheckboxButton },
  name: "LoginModal",
  data() {
    return {
      id: "",
      pass: "",
      remember: true,
    };
  },
  methods: {
    ...mapActions("UserStore", ["login", "setLoginModal"]),
    setRemember() {
      this.remember = !this.remember;
    },
    setId(id) {
      this.id = id;
    },
    setPass(pass) {
      this.pass = pass;
    },
    async onLogin() {
      await this.login({ id: this.id, pass: this.pass });
      if (this.userInfo) {
        this.setLoginModal();
      }
    },
    close($event) {
      if ($event.currentTarget === $event.target) this.setLoginModal();
      else $event.stopPropagation();
    },
  },
  computed: {
    ...mapState("UserStore", ["loginModal", "userInfo"]),
  },
};
</script>

<style scoped>
.container,
.login-form {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--shadow);
  animation: fade-in 0.5s linear;
}
.login-form {
  width: 400px;
  height: 340px;
  border-radius: 10px;
  background-color: var(--white);
  box-shadow: 4px 4px 5px var(--shadow);
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  animation: toast-up 0.5s ease-out;
}
.input-container {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h2 {
  width: 100%;
  text-align: center;
  font-size: 32px;
  color: var(--navy);
  border-bottom: 1px solid var(--gray);
  padding-bottom: 25px;
  margin-bottom: 15px;
}
.login-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-radius: 0;
  border: none;
  background-color: var(--navy);
  color: var(--white);
  font-weight: 700;
  font-size: 16px;
}
.login-btn:hover {
  opacity: 0.9;
}
.forget-password-a {
  font-size: 12px;
  text-decoration: underline;
  margin-top: 14px;
}
.forget-password-a:hover {
  color: var(--darkgray);
}
.test {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  line-height: 12px;
  margin-bottom: 10px;
  margin-left: 200px;
}
</style>
