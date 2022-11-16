<template>
  <main>
    <h1>공지사항</h1>
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
    </table>
  </main>
</template>

<script>
import http from "@/apis/http.js";

export default {
  name: "NoticeList",
  data() {
    return {
      heads: ["번호", "제목", "작성일자", "조회수"],
      ratio: [`15%`, `50%`, `25%`, `10%`],
      data: [],
    };
  },
  methods: {
    moveDetail(no) {
      this.$router.push(`notice/detail/${no}`);
    },
    getList(page, amount) {
      console.log(page, amount);
      http
        .get(`notice/list`)
        .then((res) => res.data)
        .then((data) => {
          for (let item of data) {
            delete item.content;
          }
          this.data = data;
        });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
main {
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
tbody > tr:last-child {
  /* border-bottom: 0; */
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
}
</style>
