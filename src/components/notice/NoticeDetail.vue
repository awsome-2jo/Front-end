<template>
  <div>
    <div class="btn-area">
      <round-button type="line" text="공지삭제" @event="deleteNotice" />
      <round-button text="공지수정" @event="moveNoticeModify" />
    </div>
    <section class="notice-container">
      <table>
        <colgroup>
          <col width="15%" />
          <col width="50%" />
          <col width="20%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="notice">
            <td>{{ notice.no }}</td>
            <td>{{ notice.title }}</td>
            <td>{{ notice.regDate }}</td>
            <td>{{ notice.hit }}</td>
          </tr>
          <tr>
            <td colspan="4" v-if="notice">
              <div class="content-area" v-html="notice.content"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <a class="btn-list" @click="moveNoticeList">목록</a>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getNoticeDetail, deleteNotice } from "@/api/notice";
import RoundButton from "../common/RoundButton.vue";

export default {
  name: "noticeDetail",
  components: {
    RoundButton,
  },
  data() {
    return {
      notice: null,
      ...mapState("UserStore", ["userInfo"]),
    };
  },
  methods: {
    moveNoticeModify() {
      this.$router.push(`/notice/modify/${this.notice.no}`);
    },
    deleteNotice() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        deleteNotice(this.notice.no, this.moveNoticeList);
      }
    },
    moveNoticeList() {
      this.$router.push(`/notice/list`);
    },
  },
  created() {
    const callback = (res) => {
      this.notice = res.data;
    };
    const fail = (error) => {
      console.log(error);
      alert("공지사항을 불러올 수 없습니다!");
      this.$router.back();
    };

    getNoticeDetail(this.$route.params.no, callback, fail);
  },
};
</script>

<style scoped>
.main-header {
  background-color: var(--navy);
  color: var(--white);
  width: 100%;
  height: 160px;
}
.main-header > div {
  width: 100%;
  max-width: 1080px;
  padding: 0 10px;
  box-sizing: border-box;
  margin: auto;
}
.main-header h1 {
  margin: 75px 0 5px;
}
.btn-area {
  width: 100%;
  max-width: 1020px;
  margin: auto;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  padding: 0 10px;
  z-index: 1;
}
.btn-area > * {
  margin-left: 10px;
}
.notice-container {
  width: 100%;
  max-width: 1080px;
  margin: auto;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
}
.notice-container table {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  border-collapse: collapse;
  border-top: 3px solid var(--navy);
  border-bottom: 3px solid var(--navy);
  font-size: 14px;
}
.notice-container table td,
.notice-container table th {
  padding-left: 15px;
}
.notice-container table > thead {
  border-bottom: 1px solid var(--navy);
}
.notice-container table > thead > tr {
  height: 40px;
  text-align: left;
  font-size: 14px;
  color: var(--navy);
}
.notice-container table > tbody > tr:first-child {
  border-bottom: 1px solid var(--darkgray);
  height: 50px;
}
.content-area {
  padding: 10px 25px;
  min-height: 40vh;
  height: max-content;
}
.notice-container table > tbody > .important-notice {
  background-color: var(--gray);
  color: var(--navy);
}
.btn-list {
  width: 100px;
  height: 35px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--navy);
  border-radius: 8px;
  color: var(--white);
  margin: 10px auto 50px;
  cursor: pointer;
}
</style>
