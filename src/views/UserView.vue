<template>
  <main>
    <div class="info-container">
      <h2>USER INFO</h2>
      <div class="btn-container">
        <round-button type="line" text="회원탈퇴"/>
        <round-button  text="정보수정"/>
      </div>
      <div class="flex">
        <div class="user-img">
          <font-awesome-icon icon="fa-regular fa-user" class="icon" />
        </div>

        <div class="input-conatiner">
          <div>
            <font-awesome-icon icon="fa-solid fa-user" class="icon" />
            <label>아이디</label>
            <input type="text" v-model="user.id" placeholder="-" disabled>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-signature" class="icon" />
            <label>이름</label>
            <input type="text" v-model="user.name" placeholder="-" disabled>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-envelope" class="icon" />
            <label>이메일</label>
            <input type="email" v-model="user.email" placeholder="-" disabled>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-phone" class="icon" />
            <label>전화번호</label>
            <input type="phone" v-model="user.phone" placeholder="-" disabled>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-venus-mars" class="icon" />
            <label>성별</label>
            <input type="phone" placeholder="-" :value="user.age==1?`남자`:user.age==2 ?`여자`:``" disabled>
            <input v-if="mode===`modify`" type="radio">
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-hashtag" class="icon" />
            <label>나이</label>
            <input type="number" v-model="user.number" placeholder="-" disabled>
          </div>
        </div>
        
      </div>
    </div>

    <div class="log-container">
      <h2>SEARCH LOG</h2>
    </div>
  </main>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { mapActions, mapState } from "vuex";
import RoundButton from "@/components/common/RoundButton.vue";

export default {
  components: { RoundButton },
  name: "userView",
  data() {
    return {
      mode: "default",
      user: {
        id: "",
        pass: "",
        email: "",
        name: "",
        age: 0,
        gender: 0,
      }
    }
  },
  methods: {
    ...mapActions("UserStore", ["logout"]),
  },
  computed: {
    ...mapState("UserStore", ["userInfo"]),
  },
  async created() {
    const resolve = (res) => {
      // 성공시 받아온 데이터 저장
      let {id, email, name, age, gender } = res.data;
      this.user = {id, email, name, age, gender};
    }
    const reject = (err) => {
      console.log(err);
      // 만료된 토큰인 경우 로그아웃 수행
      if(this.userInfo) this.logout();
      // 이외는 잘못된 접근 표시
      else alert("잘못된 접근입니다!");
      this.$router.push('/');
    }

    await getUserInfo(resolve, reject);
  }
}
</script>

<style scoped>
main {
  margin: 20px auto;
  max-width: 1080px;
  display: flex;
}
main > div {
  border: 1px solid var(--gray);
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
}
.user-img {
  background-color: var(--gray);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  font-size: 120px;
  color: var(--darkgray);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.info-container {
  width: 66%;
  position: relative;
}
.info-container .flex {
  display: flex;
  justify-content:space-between;
  align-items: center;
}
.log-container {
  width: 33%;
}
.input-conatiner {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  justify-content: space-around;
}
.input-conatiner > div {
  display: flex;
  align-items: center;
}
.input-conatiner label{
  display: block;
  box-sizing: border-box;
  width: 90px;
}
.input-conatiner .icon {
  width: 18px;
  color:var(--darkgray);
  padding: 5px;
}
.input-conatiner input[disabled] {
  border: none;
  font-size: 18px;
  color: var(--navy);
  font-weight: 700;
}
.btn-container {
  position: absolute;
  top: 20px;
  right: 20px;
}
.btn-container > * {
  margin-left: 10px;
}
</style>