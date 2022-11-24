<template>
  <div>
    <div class="title-container">
      <span>제목</span>
      <input v-model="title" />
      <checkbox-button :value="type" position="left" text="필독 여부" @event="toggleType" />
    </div>
    <tip-tap :value="content" @input="setContent" />
    <div class="btn-container">
      <round-button type="line" text="작성취소" @event="backToNoticeList" />
      <round-button text="글 개시" @event="submitNotice" />
    </div>
  </div>
</template>

<script>
import TipTap from "@/components/common/tiptap/TipTap.vue";
import { addNotice, getNoticeDetail, modifyNotice } from "@/api/notice";
import RoundButton from "../common/RoundButton.vue";
import CheckboxButton from "../common/CheckboxButton.vue";

export default {
  name: "noticeModify",
  components: {
    TipTap,
    RoundButton,
    CheckboxButton,
  },
  data() {
    return {
      type: false,
      editor: null,
      no: null,
      title: "",
      content: "",
    };
  },
  methods: {
    toggleType() {
      this.type = !this.type;
    },
    setContent(value) {
      this.content = value;
    },
    backToNoticeList() {
      this.$router.push(`/notice/list`);
    },
    async submitNotice() {
      let body = { no: this.no, title: this.title, content: this.content, type: this.type ? 1 : 0 };
      const resolve = (res) => {
        if (res.status === 200) this.$router.push(`/notice/detail/${res.data}`);
      };
      const reject = (error) => console.log(error);

      if (!this.$route.params.no) addNotice(body, resolve, reject);
      else modifyNotice(body, resolve, reject);
    },
  },
  created() {
    if (!this.$route.params.no) return;
    const resolve = (res) => {
      this.no = res.data.no;
      this.title = res.data.title;
      this.content = res.data.content;
    };
    const reject = (error) => console.log(error);

    getNoticeDetail(this.$route.params.no, resolve, reject);
  },
};
</script>

<style scoped>
.title-container {
  box-sizing: border-box;
  margin: auto;
  margin-top: 30px;
  height: 50px;
  width: 100%;
  max-width: 1020px;
  border-top: 3px solid var(--navy);
  color: var(--navy);
  font-weight: 700;
  display: flex;
  align-items: center;
}
.title-container > input {
  width: 80%;
  height: 30px;
  border: 1px solid var(--gray);
  border-radius: 3px;
  background-color: var(--gray);
  font-size: 16px;
}
.title-container > input:focus {
  outline: none;
}
.title-container > span {
  padding: 20px 30px;
}
.btn-container {
  margin: auto;
  margin-bottom: 50px;
  width: 100%;
  max-width: 1000px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.btn-container > * {
  margin-left: 10px;
}
</style>
