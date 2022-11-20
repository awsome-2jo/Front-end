<template>
  <main>
    <div>
      제목
    </div>
    <tip-tap :value="content" @input="setContent" />
    <button @click="submitNotice">보내기</button>
  </main>
</template>

<script>
import TipTap from "@/components/common/tiptap/TipTap.vue";
import { addNotice, getNoticeDetail, modifyNotice } from "@/api/notice";

export default {
  name: "noticeModify",
  components: {
    TipTap
  },
  data() {
    return {
      editor: null,
      no: null,
      title: "tiptap 라이브러리를 이용한 공지사항",
      content: "",
    }
  },
  methods: {
    setContent(value) {
      this.content = value;
    },
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
  },
}
</script>

<style scoped>

</style>