<template>
  <main>
    <!-- <button>삭제</button>
    <button>수정</button>
    <table>
      <tr>
        <th>번호</th>
        <td class="no">{{ data.no }}</td>
        <th>작성일자</th>
        <td class="regDate">{{ data.regDate }}</td>
        <th>조회수</th>
        <td class="hit">{{ data.hit }}</td>
      </tr>
      <tr>
        <th>제목</th>
        <td colspan="5" class="title">{{ data.title }}</td>
      </tr>
      <tr>
        <td colspan="6" class="content">
          {{ data.content }}
        </td>
      </tr>
    </table> -->
    <nav class="nav-notice">
        <!-- <a id="next-notice">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
		</svg>윗글</a>
        <a id="pre-notice">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
			</svg>아랫글</a> -->
      </nav>
      <section class="notice-container">
        <div class="notice-head">
          <h3>{{ notice?.title }}</h3>
          <div>
            <div>
              <span>관리자</span> |
              <span>{{ notice?.regDate }}</span>
            </div>
            <div>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg>
              {{ notice?.hit }}</span>
            </div>
          </div>
        </div>
        <hr>
          <div v-if="userInfo()?.id===`admin`" class="nav-modify">
            <a class="modify-btn" @click.prevent="moveNoticeModify">수정</a>
            <a class="delete-btn" @click.prevent="deleteNotice">삭제</a>
          </div>
        <article class="notice-body"  v-html="notice?.content">
        </article>
      </section>
      <!-- <section class="comment-container">
        <h5>3개의 댓글</h5>
        <form class="comment-form">
          <textarea name="content" rows="3"></textarea>
          <button>등록</button>
        </form>
        <article class="comment">
          <div class="comment-head">
            <span>user-name</span> | 
            <span>reg-date</span>
          </div>
          <div class="comment-body">
            content
          </div>
        </article>
      </section> -->
      <a class="btn-list" @click="moveNoticeList">목록</a>
  </main>
</template>

<script>
import { mapState } from "vuex";
import { getNoticeDetail, deleteNotice } from "@/api/notice";

export default {
  name: "noticeDetail",
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
      if(confirm("정말로 삭제하시겠습니까?")) {
        deleteNotice(this.notice.no, this.moveNoticeList);
      }
    },
    moveNoticeList() {
      this.$router.push(`/notice/list`);
    }
  },
  created() {
    const callback = (res) => {
      this.notice = res.data;
    }
    const fail = (error) => {
      console.log(error);
      alert("공지사항을 불러올 수 없습니다!");
      this.$router.back();
    }

    getNoticeDetail(this.$route.params.no, callback, fail);
  },
};
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
/* Nav topic */
.nav-topic ul > li:nth-child(3),
.nav-topic ul > li:nth-child(3) > a {
  border-color: var(--main-color);
  color: var(--main-color);
}
</style>
