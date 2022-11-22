<template>
  <div class="container" @click="close" v-show="registerModal">
    <form class="register-form">
      <h2>HOME:IN</h2>
      <div class="input-container">
        <text-input icon="user" placeholder="아이디" :value="id" @on-change="setId" />
        <text-input icon="password" placeholder="비밀번호" type="password" :value="pass" @on-change="setPass" />
        <text-input icon="user" placeholder="이름" :value="name" @on-change="setName" />
        <text-input icon="user" placeholder="이메일" :value="email" type="email" @on-change="setEmail" />
        <text-input icon="user" placeholder="성별" :value="gender" @on-change="setGender" />
        <text-input icon="user" placeholder="나이" :value="age" type="number" @on-change="setAge" />
        <text-input icon="user" placeholder="폰번호" :value="phone" @on-change="setPhone" />
        <text-input icon="user" placeholder="선호 사항 1" :value="preferOrder1" @on-change="setPreferOrder1" />
        <text-input icon="user" placeholder="선호 사항 2" :value="preferOrder2" @on-change="setPreferOrder2" />
      </div>
      <button class="register-btn" @click.prevent="onregister">회원가입</button>
    </form>
  </div>
</template>

<script>
import TextInput from "../common/TextInput.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { TextInput },
  name: "RegisterModal",
  data() {
    return {
      id: "",
      pass: "",
      name: "",
      email: "",
      gender: "",
      age: "",
      phone: "",
      preferOrder1: "",
      preferOrder2: "",
      remember: true,
    };
  },
  methods: {
    ...mapActions("UserStore", ["register", "setRegisterModal"]),
    setRemember() {
      this.remember = !this.remember;
    },
    setId(id) {
      this.id = id;
    },
    setPass(pass) {
      this.pass = pass;
    },
    setName(name) {
      this.name = name;
    },
    setEmail(email) {
      this.email = email;
    },
    setGender(gender) {
      this.gender = gender;
    },
    setAge(age) {
      this.age = age;
    },
    setPhone(phone) {
      this.phone = phone;
    },
    setPreferOrder1(preferOrder1) {
      this.preferOrder1 = preferOrder1;
    },
    setPreferOrder2(preferOrder2) {
      this.preferOrder2 = preferOrder2;
    },
    async onregister() {
      await this.register({
        id: this.id,
        pass: this.pass,
        name: this.name,
        email: this.email,
        gender: this.gender,
        age: this.age,
        phone: this.phone,
        preferOrder1: this.preferOrder1,
        preferOrder2: this.preferOrder2,
      });
      if (this.userInfo) {
        this.setRegisterModal();
      }
    },
    close($event) {
      if ($event.currentTarget === $event.target) this.setRegisterModal();
      else $event.stopPropagation();
    },
  },
  computed: {
    ...mapState("UserStore", ["registerModal", "userInfo"]),
  },
};
</script>

<style scoped>
.container,
.register-form {
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
.register-form {
  width: 400px;
  height: 700px;
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
.input-container > * {
  margin: 10px;
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
.register-btn {
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
.register-btn:hover {
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
