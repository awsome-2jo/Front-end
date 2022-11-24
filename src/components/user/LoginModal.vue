<template>
  <div class="container" @click="close" v-show="loginModal">
    <form class="form-container" v-if="mode===`login`">
      <h2>HOME:IN</h2>
      <checkbox-button class="test" :value="remember" text="아이디 저장" position="left" @event="setRemember" />
      <div class="input-container">
        <text-input icon="user" placeholder="아이디" :value="id" @on-change="setId" />
        <text-input icon="password" placeholder="비밀번호" type="password" :value="pass" @on-change="setPass" />
      </div>
      <span class="forget-a">
        <a @click.prevent="setMode(`find-id`)">아이디 찾기</a> | <a @click.prevent="setMode(`find-pass`)">비밀번호 찾기</a>
      </span>
      <button class="login-btn" @click.prevent="onLogin">LOGIN</button>
    </form>

    <form class="form-container" v-else>
      <h2>HOME:IN</h2>
      <div class="input-container">
        <text-input v-if="mode===`find-pass`" icon="user" placeholder="아이디" :value="id" @on-change="setId" />
        <text-input icon="name" placeholder="이름" :value="name" @on-change="setName" />
        <text-input icon="mail" placeholder="이메일" type="email" :value="email" @on-change="setEmail" />
        <text-input icon="phone" placeholder="전화번호" type="phone" :value="phone" @on-change="setPhone" />
      </div>
      <span class="forget-a" v-if="mode===`find-id`">
        <a @click.prevent="setMode(`login`)">로그인으로</a> |<a @click.prevent="setMode(`find-pass`)">비밀번호 찾기</a>
      </span>
      <span class="forget-a" v-else>
        <a @click.prevent="setMode(`login`)">로그인으로</a> |<a @click.prevent="setMode(`find-id`)">아이디 찾기</a>
      </span>
      <button v-if="mode===`find-id`" class="login-btn" @click.prevent="onFindId">아이디 찾기</button>
      <button v-else class="login-btn" @click.prevent="onFindPass">비밀번호 찾기</button>
    </form>
    
  </div>
</template>

<script>
import CheckboxButton from "../common/CheckboxButton.vue";
import TextInput from "../common/TextInput.vue";
import { mapActions, mapState } from "vuex";
import { findId, findPass } from "@/api/user";

export default {
  components: { TextInput, CheckboxButton },
  name: "LoginModal",
  data() {
    let _id = localStorage.getItem("home-in-id");
    return {
      id: _id ? _id : "",
      pass: "",
      remember: Boolean(localStorage.getItem("home-in-id")),
      mode: "login",

      name:"",
      phone:"",
      email:"",
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
    setMode(mode){
      this.mode = mode;
    },
    setEmail(val){
      this.email = val;
    },
    setPhone(val){
      this.phone = val;
    },
    setName(val){
      this.name = val;
    },
    async onLogin() {
      await this.login({ id: this.id, pass: this.pass });
      if (this.userInfo) {
        if(this.remember) localStorage.setItem("home-in-id", this.id);
        else localStorage.removeItem("home-in-id");
        this.setLoginModal();
      }
    },
    async onFindId() {
      let {name, email, phone} = this;
      
      const resolve = (res) => {
        alert(`당신의 아이디는 ${res.data}입니다!`);
        this.id = res.data;
        this.mode = 'login';
      }
      const reject = () => {
        alert(`아이디 찾기에 실패하였습니다! 입력한 정보를 다시 확인해주세요.`);
      }
      await findId({name, email, phone}, resolve, reject);
    },
    async onFindPass() {
      let {name, email, phone, id} = this;

      const resolve = () => {
        alert(`가입하신 이메일로 새로운 비밀번호가 발급되었습니다! 메일을 확인해주세요.`);
        this.mode = 'login';
      }
      const reject = () => {
        alert(`비밀번호 찾기에 실패하였습니다! 입력한 정보를 다시 확인해주세요.`);
      }

      await findPass({name, email, phone, id}, resolve, reject);
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
.form-container {
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
.form-container {
  width: 400px;
  height: fit-content;
  padding-bottom: 80px;
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
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.input-container > div {
  margin: 8px;
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
.forget-a {
  margin-top: 14px;
  color: var(--darkgray);
}
.forget-a > a{
  font-size: 12px;
  text-decoration: underline;
  color: var(--black);
}
.forget-a > a:hover {
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
