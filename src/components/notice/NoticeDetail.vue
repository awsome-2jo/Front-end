<template>
  <main>
    <button>삭제</button>
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
    </table>
  </main>
</template>

<script>
import http from "@/apis/http.js";

export default {
  name: "noticeDetail",
  data() {
    return {
      data: null,
    };
  },
  methods: {},
  created() {
    http
      .get(`notice/detail?no=${this.$route.params.no}`)
      .then((res) => res.data)
      .then((data) => (this.data = data));
  },
};
</script>

<style scoped>
table,
table * {
  box-sizing: content-box;
  border-collapse: collapse;
}
table {
  margin: auto;
  width: 100%;
}
tr {
  width: 100%;
  background-color: red;
  border: 1px solid black;
}
th {
  width: 100px;
  text-align: left;
  background-color: var(--gray);
  padding: 5px 10px;
}
.content {
  padding: 15px 20px;
}
</style>
