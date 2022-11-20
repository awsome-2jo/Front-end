<template>
  <main>
    <div class="notice-title">
        <strong>공지사항 작성</strong>
    </div>
    <form class="notice-container notice-form">
      <div class="notice-head">
        <label for="title">제목 </label>
        <input id="title" name="title" type="text" v-model="title">
      </div>
      <hr>
      <div class="notice-body">
        <textarea name="content" id="content" rows="10" v-model="content"></textarea>
      </div>
      <button class="btn-list" @click.prevent="submitNotice">완료</button>
    </form>
  </main>
</template>

<script>
import { addNotice, getNoticeDetail, modifyNotice } from "@/api/notice";

export default {
  name: "noticeModify",
  data() {
    return {
      no: null,
      title: "",
      content: "",
    }
  },
  methods: {
    async submitNotice() {
      let body = {no: this.no, title: this.title, content: this.content};
      const resolve = (res) => {
        if (res.status===200) this.$router.push(`/notice/detail/${res.data}`)
      };
      const reject = (error) => console.log(error);

      if(!this.$route.params.no) addNotice(body, resolve, reject);
      else modifyNotice(body, resolve, reject);
    }
  },
  created() {
    if(!this.$route.params.no) return;
    const resolve = (res) => {
      this.no = res.data.no;
      this.title = res.data.title;
      this.content = res.data.content;
    };
    const reject = (error) => console.log(error);

    getNoticeDetail(this.$route.params.no, resolve, reject);
  }
}
</script>

<style scoped>
main {
  width: 100%;
  max-width: 1080px;
  margin: auto;
}
.nav-notice {
  margin: 21px 0;
  display: flex;
}
.nav-notice > a {
  display: block;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  text-decoration: none;
  border: 1px solid #aaa;
  font-size: 12px;
  margin-right: 10px;
  cursor: pointer;
  color: #000;
}
.notice-container {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 21px 4px;
}
.notice-head > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 14px;
}
.notice-body {
  padding: 16px 4px;
}
.comment-container {
  padding: 21px 4px;
}
.comment-container > form {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
}
.comment-container > form > textarea {
  flex: 1 1 100%;
}
.comment-container > form > button {
  display: block;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: 1px solid #aaa;
  font-size: 12px;
  margin-top: 10px;
  cursor: pointer;
}
.comment {
  margin-top: 16px;
  border-top: 1px solid #aaa;
  padding: 16px 4px 0;
}
.comment-head {
  font-size: 14px;
}
.comment-body {
  padding: 4px 16px;
}
.btn-list {
  margin: auto;
  margin-top: 21px;
  display: block;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  text-decoration: none;
  border: 1px solid #aaa;
  font-size: 12px;
  cursor: pointer;
  color: #000;
}
.btn-list:hover {
	color: #000;
}
.nav-modify {
  display: flex;
  justify-content: end;
}
.nav-modify > a {
  display: block;
  margin-left: 10px;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  text-decoration: none;
  border: 1px solid #aaa;
  font-size: 12px;
  cursor: pointer;
  color: #000;
}
.notice-form {
  border-bottom: none;
}
.notice-form > .notice-head {
  display: flex;
}
.notice-form > .notice-head > label {
  flex-shrink: 0;
  width: 60px;
}
.notice-form > .notice-head > input {
  border: 1px solid #eaeaea;
  flex-grow: 1;
}
.notice-form > .notice-body > textarea {
  width: 100%;
  border: 1px solid #eaeaea;
}
.notice-title {
  margin-top: 21px;
  font-size: 35px;
  margin-bottom: 20px;
  position: relative;
}
.nav-notice svg {
  margin: 0 3px 5px 0;
}
</style>