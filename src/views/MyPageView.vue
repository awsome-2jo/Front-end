<template>
  <main>
    <div class="main-header drag-block">
      <div>
        <h1>마이페이지</h1>
        <span>회원 정보를 확인해보세요</span>
      </div>
    </div>
    <div>
      <div class="display-container">
        <div>{{ id }}</div>
        <div>{{ name }}</div>
        <div>{{ email }}</div>
        <div>{{ gender }}</div>
        <div>{{ age }}</div>
        <div>{{ phone }}</div>
      </div>
      <!-- <form class="modify-form">
        <div class="input-container">
          <text-input icon="user" placeholder="아이디" :value="id" @on-change="setId" />
          <text-input icon="user" placeholder="이름" :value="name" @on-change="setName" />
          <text-input icon="user" placeholder="이메일" :value="email" type="email" @on-change="setEmail" />
          <text-input icon="user" placeholder="성별" :value="gender" @on-change="setGender" />
          <text-input icon="user" placeholder="나이" :value="age" type="number" @on-change="setAge" />
          <text-input icon="user" placeholder="폰번호" :value="phone" @on-change="setPhone" />
       </div>
      </form> -->
    </div>
  </main>
</template>

<script>
// import TextInput from "@/components/common/TextInput.vue";

export default {
  //   components: { TextInput },
  name: "MyPageView",
  data() {
    return {
      id: "아이디",
      name: "이름",
      email: "이메일",
      phone: "번호",
      gender: "성별",
      age: "나이",
    };
  },
  methods: {
    setId(id) {
      this.id = id;
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
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
main > div {
  width: 100%;
}
.main-header {
  background-color: var(--navy);
  color: var(--white);
  width: 100%;
  height: 160px;
}
.main-header > div {
  width: 100%;
  max-width: 1020px;
  padding: 0 10px;
  box-sizing: border-box;
  margin: auto;
}
.main-header h1 {
  margin: 75px 0 5px;
}
</style>
