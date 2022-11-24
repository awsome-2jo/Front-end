<template>
  <main>
    <div class="info-container">
      <h2>USER INFO</h2>
      <div class="btn-container" v-if="defaultMode">
        <round-button type="line" text="회원탈퇴" @event="deleteUser"/>
        <round-button  text="회원수정" @event="setMode(`modify`)"/>
      </div>
      <div class="btn-container" v-else>
        <round-button type="line" text="수정취소" @event="setMode(`default`)"/>
        <round-button  text="수정적용" @event="modifyUser()"/>
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
            <input type="text" v-model="user.name" placeholder="-" :disabled="defaultMode">
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-key" class="icon" />
            <label>비밀번호</label>
            <input type="password" v-model="user.pass" placeholder="*************" :disabled="defaultMode">
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-envelope" class="icon" />
            <label>이메일</label>
            <input type="email" v-model="user.email" placeholder="-" disabled>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-phone" class="icon" />
            <label>전화번호</label>
            <input type="phone" v-model="user.phone" placeholder="-" :disabled="defaultMode">
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-venus-mars" class="icon" />
            <label>성별</label>
            <input v-if="defaultMode" type="phone" placeholder="-" :value="genderString" disabled>
            <div v-else class="radio">
              <font-awesome-icon icon="fa-solid fa-venus-mars"/>
              <input type="radio" v-model="user.gender" value="0">
              <font-awesome-icon icon="fa-solid fa-mars" />
              <input type="radio" v-model="user.gender" value="1">
              <font-awesome-icon icon="fa-solid fa-venus" />
              <input type="radio" v-model="user.gender" value="2">
            </div>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-hashtag" class="icon" />
            <label>나이</label>
            <input type="number" v-model="user.number" placeholder="-" :disabled="defaultMode">
          </div>
        </div>

      </div>
    </div>

    <!-- <div class="log-container">
      <h2>SEARCH LOG</h2>
    </div> -->
  </main>
</template>

<script>
import { getUserInfo, modifyUser, withdraw } from "@/api/user";
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
    setMode(mode) {
      this.mode = mode;
    },
    async modifyUser() {
      const resolve = () => {
        alert("변경되었습니다!");
        this.mode = "default";
      }
      const reject = (err) => {
        console.log(err);
        alert("변경을 실패하였습니다!");
      }
      let body = {};
      this.user.gender = 0; // 성별의 경우 0도 값이므로 추가
      this.user.age = 0;
      for(let item in this.user) {
        if(this.user[item]) body[item] = this.user[item];
      }
      await modifyUser(body, resolve, reject);
    },
    async deleteUser() {
      if(!confirm("정말로 탈퇴하시겠습니까?")) return;

      const resolve = () => {
        this.logout();
        alert("탈퇴되었습니다! 그동안 HOME:IN을 이용해주셔서 감사합니다");
        this.$router.push("/");
      }
      const reject = () => {
        alert("회원탈퇴에 실패하였습니다!");
      }
      await withdraw(this.user.id, resolve, reject);
    },
    async initUserData() {
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
  },
  computed: {
    ...mapState("UserStore", ["userInfo"]),
    defaultMode() {
      return this.mode==='default';
    },
    genderString() {
      return this.user.age==1?`남자`:this.user.age==2 ?`여자`: ``;
    }
  },
  created() {
    this.initUserData();
  },
  watch: {
    userInfo() {
      if(this.userInfo) {
        this.logout();
        this.$router.push('/');
      }
    },
    mode() {
      this.initUserData();
    }
  }
}
</script>

<style scoped>
main {
  margin: 20px auto;
  min-height: 60vh;
  height: 100%;
  max-width: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}
main::before {
  content: "";
  position: absolute;
  background-color: var(--navy);
  top:0;
  width: 100vw;
  height: 100vh;
}
main > div {
  border: 1px solid var(--gray);
  display: flex;
  flex-direction: column;
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
  background-color: var(--white);
}
.info-container .flex {
  padding: 20px;
  display: flex;
  justify-content:space-between;
  align-items: center;
}
.info-container h2 {
  margin: 0;
  padding: 20px;
  outline: 1px solid var(--gray);
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
  width: 200px;
}
.input-conatiner input {
  border: 1px solid var(--darkgray);
  width: 200px;
  font-size: 18px;
  color: var(--navy);
}
.input-conatiner input[type="radio"] {
  width: auto;
  margin-right: 20px;
}
.radio {
  color: var(--navy);
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