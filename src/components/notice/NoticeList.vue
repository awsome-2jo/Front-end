<template>
  <main>
    <!-- <h1>공지사항</h1>
    <table>
      <thead>
        <tr>
          <th v-for="(head, i) of heads" :width="ratio[i]" :key="`th-${head}`">{{ head }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="!data.length" class="empty">
          공지사항이 없습니다.
        </tr>
        <tr v-else v-for="(item, i) of data" :key="`tbody-tr-${i}`" @click="moveDetail(item.no)">
          <td v-for="val of item" :key="`tbody-tr-${i}th-${val}`">{{ val }}</td>
        </tr>
      </tbody>
    </table> -->
    <div>
        <div class="notice-title">
          <strong>공지사항</strong>
            <a v-if="userInfo()?.id===`admin`" class="btn-add" @click="addNotice">추가</a>
        </div>
        <div class="notice-list" style="margin-top: 10px">
          <table class="notice-post">
            <thead>
              <tr>
                <th style="width: 10%">번호</th>
                <th style="width: 60%">제목</th>
                <th style="width: 20%">작성일</th>
                <th style="width: 10%">조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!data.length">
                <td colspan="4">
                  올라온 게시물이 없습니다.
                </td>
              </tr>
              <tr v-else v-for="notice of data" :key="`tbody-tr-${notice.no}`" @click="moveDetail(notice.no)">
                <td>{{notice.no}}</td>
                <td>{{notice.title }}</td>
                <td>{{notice.regDate}}</td>
                <td>{{ notice.hit }}</td>
              </tr>            	
            </tbody>
          </table>
        </div>
        <div class="search">
          <text-input icon="search" />
        </div>
      </div>
  </main>
</template>

<script>
import http from "@/api/http.js";
import { mapState } from "vuex";
import TextInput from "../common/TextInput.vue";

export default {
  components: { TextInput },
  name: "NoticeList",
  data() {
    return {
      // heads: ["번호", "제목", "작성일자", "조회수"],
      // ratio: [`15%`, `50%`, `25%`, `10%`],
      data: [],
      ...mapState(["userInfo"]),
    };
  },
  methods: {
    moveDetail(no) {
      this.$router.push(`/notice/detail/${no}`);
    },
    getList(page, amount) {
      console.log(page, amount);
      http
        .get(`/notice/list`)
        .then((res) => res.data)
        .then((data) => {
          for (let item of data) {
            delete item.content;
          }
          this.data = data;
        });
    },
    addNotice() {
      this.$router.push(`/notice/add`);
    }
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
main {
  width: 100%;
  max-width: 1080px;
  margin: auto;
}
a {
  text-decoration: none;
  color: rgb(46, 46, 46);
}
body {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
body > * {
  flex-shrink: 0;
}
.map-section {
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
}
/* Map Section */
#map {
  height: 100%;
  flex-grow: 1;
  background-color: blueviolet;
}
.data-list {
  width: 400px;
  background-color: #fff;
  padding: 21px 16px 10px;
  overflow-y: scroll;
}
.data-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.data-menu button {
  padding: 10px;
  width: 100%;
  background-color: #fff;
  border: solid 1px #aaa;
  font-weight: bold;
}
.data-menu > button:nth-child(2) {
  background-color: #5a7a94;
  color: white;
}
.data-sort {
  padding: 10px;
  font-size: 17px;
  display: flex;
  justify-content: space-evenly;
}
.data-sort > a:nth-child(1) {
  color: #346f9f;
  font-weight: bold;
}
.data-item {
  list-style: none;
  display: flex;
  height: 120px;
  padding: 20px 20px 20px 0;
  border-bottom: 1px solid #e2e2e2;
}
.data-item > div:nth-child(2) {
  padding-left: 16px;
  flex-grow: 1;
  align-self: center;
}
.data-item > div:nth-child(2) > p {
  margin: 0;
}
.data-item > div:nth-child(2) > p:first-child {
  font-weight: 900;
  font-size: 1.125em;
  margin-bottom: 5px;
}
.data-item > div:nth-child(2) > p:last-child {
  color: #444;
  font-size: 0.825em;
}
.data-item > .img-box {
  flex-grow: 2;
  height: 100%;
}
/* Nav topic */
.nav-topic ul > li:nth-child(3),
.nav-topic ul > li:nth-child(3) > a {
  border-color: var(--main-color);
  color: var(--main-color);
}

.notice-title {
  margin-top: 50px;
  font-size: 35px;
  margin-bottom: 20px;
  position: relative;
}
.notice-post {
  position: relative;
  width: 100%;
  table-layout: fixed;
  border-top: 2px solid #000;
  border-bottom: 1px solid #dadada;
  line-height: 20px;
  font-size: 18px;
  border-collapse: collapse;
}

.notice-post > thead > tr {
  border-bottom: 1px solid rgb(225, 225, 225);
  height: 60px;
  text-align: center;
}
.notice-post > tbody > tr {
  border-bottom: 1px solid rgb(225, 225, 225);
  height: 55px;
  cursor: pointer;
}
.notice-post > tbody > tr:hover {
  background-color: #fcfcfc;
}
.notice-post > tbody > tr > td {
  text-align: center;
}
.notice-post > tbody > tr > td:nth-child(2) {
  padding-left: 10%;
  text-align: left;
}

.search {
  display: flex;
  justify-content: center;
  margin: 80px;
  height: 40px;
  text-align: center;
}
.search-text {
  padding: 7px;
  width: 40%;
}
.search-btn {
  padding: 8px 16px;
  margin: 0;
  flex-grow: 5;
  border: 1px solid var(--main-color);
  border-left: 0;
  color: #fff;
  background-color: var(--main-color);
}
.content {
  margin: 24px 16px;
}
hr {
  color: rgb(180, 180, 180);
}
.btn-add {
  position: absolute;
  right: 0;
  font-size: 14px;
  bottom: 0;
  display: block;
  margin-left: 10px;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  text-decoration: none;
  border: 1px solid #aaa;
  cursor: pointer;
  color: #000;
}
/* main {
  margin: auto;
  max-width: 1080px;
}
h1 {
  margin-top: 40px;
}
table,
table * {
  box-sizing: content-box;
  border-collapse: collapse;
}
table {
  margin: auto;
  width: 100%;
}
th,
td {
  padding: 10px 20px;
  text-align: left;
}
th {
  color: var(--navy);
  font-weight: 900;
  border-bottom: 3px solid var(--navy);
}
tr {
  width: 100%;
}
tbody {
  position: relative;
}
tbody > tr {
  cursor: pointer;
  border-bottom: 0.5px solid #f5f5f5;
  height: 60px;
}
tbody > tr:hover {
  background-color: var(--gray);
}
table > thead > tr:first-child > th:first-child {
  border-top-left-radius: 10px;
}
table > thead > tr:first-child > th:last-child {
  border-top-right-radius: 10px;
  border-right: 0;
}
table > tbody > tr.empty {
  position: absolute;
  width: 100%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  opacity: 0.7;
} */
</style>
