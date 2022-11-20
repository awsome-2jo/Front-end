<template>
  <main>
    <div class="main-header drag-block">
      <div>
        <h1>공지사항</h1>
        <span>업데이트 소식 및 이벤트를 확인해보세요</span>
      </div>
    </div>
    <section class="notice-container">
    <div class="search-area">
      <select-box :select="search.key" :options="keyOption" @on-change="setKey"/>
      <form name="d">
      <text-input icon="search" :value="keyword" @on-change="setKeyword"/>
      <button @click.prevent="onSearch" style="display:none"></button>
      </form>
    </div>
      <table>
        <colgroup>
        <col width="15%"/>
        <col width="50%"/>
        <col width="20%"/>
        <col width="15%"/>
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
          <tr v-for="notice of importantNoticeList" :key="`tbody-tr-important-${notice.no}`" @click="moveDetail(notice.no)"
          class="important-notice">
            <td>{{notice.no}}</td>
            <td>{{notice.title }}</td>
            <td>{{notice.regDate}}</td>
            <td>{{ notice.hit }}</td>
          </tr>

          <tr v-if="!noticeList.length">
            <td colspan="4">
              올라온 게시물이 없습니다.
            </td>
          </tr>
          <tr v-else v-for="notice of noticeList" :key="`tbody-tr-${notice.no}`" @click="moveDetail(notice.no)">
            <td>{{notice.no}}</td>
            <td>{{notice.title }}</td>
            <td>{{notice.regDate}}</td>
            <td>{{ notice.hit }}</td>
          </tr>
        </tbody>
      <round-button text="공지추가" class="add-notice-btn" @event="addNotice"/>
      </table>
      <div class="page-container" @click="setPage">
        <a href="#" v-if="page-2>1">1</a>
        <span v-if="page-3>1" class="ellipsis">…</span>
        <a href="#" v-for="i in [2, 1].filter(val => page-val>0)" :key="`page-btn-${page-i}`">{{ page-i }}</a>
        <a href="#" class="selected">{{page}}</a>
        <a href="#" v-for="i in [1, 2].filter(val => page+val <= totalpage)" :key="`page-btn-${page+i}`">{{ page+i }}</a>
        <span v-if="page+3<totalpage" class="ellipsis">…</span>
        <a href="#" v-if="page+2<totalpage">{{ totalpage }}</a>
      </div>
    </section>
  </main>
</template>

<script>
import { getNoticeList, getNoticeListCount } from "@/api/notice";
import { mapState } from "vuex";
import RoundButton from "@/components/common/RoundButton.vue";
import TextInput from "@/components/common/TextInput.vue";
import SelectBox from "@/components/common/SelectBox.vue";

export default {
  components: { RoundButton, TextInput, SelectBox },
  name: "NoticeList",
  data() {
    return {
      importantNoticeList: [],
      noticeList: [],
      keyword: "",
      key: "title",
      page: 1,
      amount: 8,
      totalpage: 1,
      keyOption: [
        {text:"제목", value:"title"},
        {text:"내용", value:"content"},
      ],
      search: {
        key: "제목"
      },
    };
  },
  methods: {
    // 검색 이벤트 : 검색창에서 Enter 클릭 시 발생
    onSearch() {
      this.page = 1;
      this.getListCount();
      this.getList(1);
      this.getList(0);
    },
    // 페이지 변경 이벤트 : A 태그 틀릭 시 발생
    setPage($event){
      if($event.target.tagName==="A"){
        this.page = +$event.target.text;
      }
    },
    // 키워드(검색창) 변경 이벤트
    setKeyword(value){
      this.keyword = value;
    },
    // 검색조건 변경 이벤트
    setKey(option){
      this.key = option.value,
      this.search.key = option.text;
      this.onSearch();
    },
    // 상세 페이지 이동 이벤트
    moveDetail(no) {
      this.$router.push(`/notice/detail/${no}`);
    },
    // 공지사항 목록 요청 이벤트
    getList(type) {
      const params = {keyword: this.keyword, key: this.key, amount: this.amount, page:this.page, start: 0, type: type? 1: 0};
      const callback = (res) => {
        if(type) this.importantNoticeList = res.data;
        else this.noticeList = res.data
      };
      const fail = (error) => console.log(error);
      getNoticeList(params, callback, fail);
    },
    // 공지추가 페이지 이동 이벤트
    addNotice() {
      this.$router.push(`/notice/add`);
    },
    // 페이징을 위한 전체 공지사항 개수 요청 이벤트
    getListCount(){
      const params = {keyword: this.keyword, key: this.key, amount: this.amount};
    const resolve = (res) => {
      this.totalpage = res.data.totalpage;
    }
    const reject = (error) => console.log(error);
    getNoticeListCount(params, resolve, reject);
    }
  },
  computed: {
    ...mapState("UserStore", ["userInfo"]),
  },
  watch: {
    page() {
      this.getList();
    }
  },
  created() {
    this.getListCount();
    this.getList(1);
    this.getList(0);
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
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
.notice-container {
  width: 100%;
  max-width: 1080px;
  margin: auto;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
}
.search-area {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
}
.search-area > * {
  margin-left: 10px;
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
.notice-container table > tbody > tr {
  border-bottom: 1px solid var(--darkgray);
  height: 50px;
  cursor: pointer;
}
.notice-container table > tbody > tr:hover {
  opacity: 0.7;
  background-color: var(--gray);
  color: var(--navy);
}
.notice-container table > tbody > .important-notice {
  background-color: var(--gray);
  color: var(--navy);
}
.page-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-container a {
  cursor: pointer;
  display: block;
  width: 24px;
  height: 24px;
  margin: 20px 2px;
  line-height: 24px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  color: var(--black);
}
.page-container a:hover {
  color: var(--navy);
  font-weight: 700;
}
.page-container > .ellipsis {
  background-color: var(--darkgray);
  cursor: default;
}
.page-container > a.selected {
  background-color: var(--gray);
  color: var(--navy);
  font-weight: 700;
  border-radius: 5px;
}
.add-notice-btn {
  position: absolute;
  margin-top: 15px;
  right: 10px;
}
</style>
