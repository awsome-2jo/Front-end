<template>
  <div class="container">
    <div class="icon-info-area">
      <icon-data-box icon="dollar" label="평균 아파트 거래가" :value="avgDeal" />
      <div class="divider"></div>
      <icon-data-box icon="folder" label="아파트 실거래 내역 수" :value="sumDeal" />
    </div>

    <div class="place-info-area">
      <h3>주요 시설 정보</h3>
      <div>
        <div v-for="item, idx in getPlaceInfo" :key="`local-info-${item.label}`" class="place-info drag-block" :class="{odd: (idx+1)%2}">
          <div>{{item.label}}</div>
          <div>{{item.value}}곳</div>
          <div class="hover-point"></div>
        </div>
      </div>
    </div>

    <local-news-list />
    <local-blog-list />
  </div>
</template>

<script>
import IconDataBox from "../common/IconDataBox.vue";
import LocalBlogList from "../common/LocalBlogList.vue";
import LocalNewsList from "../common/LocalNewsList.vue";
export default {
  components: { IconDataBox, LocalNewsList, LocalBlogList },
  name: "LocalInfo",
  data() {
    return {
      avgDeal: "16억 3000만원",
      sumDeal: "4,240",
      place: {
        kindergarden: 0,
        hospital:0,
        elementarySchool: 0,
        middleSchool: 0,
        highSchool: 0,
        mart: 0,
        subway: 0,
        academy: 0,
        caulturalFacility: 0,
      }
    }
  },
  computed: {
    getPlaceInfo() {
      const arr = [
        {label: "유치원", value: this.place.kindergarden},
        {label: "병원", value: this.place.hospital},
        {label: "초등학교", value: this.place.elementarySchool},
        {label: "지하철역", value: this.place.subway},
        {label: "중・고등학교", value: this.place.middleSchool + this.place.highSchool},
        {label: "마트", value: this.place.mart},
        {label: "학원", value: this.place.academy},
        {label: "문화시설", value: this.place.caulturalFacility},
      ];
      return arr;
    },
  },
};
</script>

<style>
.container {
  height: calc(100% - 105px);
  overflow: scroll;
}
.icon-info-area {
  display: flex;
  padding: 20px 20px 5px;
}
.divider {
  width: 20px;
  height: 20px;
}
.place-info-area {
  background-color: var(--gray);
  margin: 10px 20px;
  padding: 10px;
  color: var(--navy);
  border-radius: 8px;
}
.place-info-area > h3 {
  text-align: center;
  margin: 0 0 5px;
  font-size: 16px;
}
.place-info-area > div {
  display: flex;
  flex-wrap: wrap;
}
.place-info {
  box-sizing: border-box;
  flex-basis: 50%;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  font-size: 14px;
  position: relative;
}
.place-info > div:nth-child(2) {
  font-weight: 900;
}
.place-info.odd {
  border-right: 1px solid var(--darkgray);
}
.place-info .hover-point{
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 4px);
  top: 2px;
  left: 5px;
  border-radius: 8px;
  background-color: var(--navy);
  opacity: 0;
  cursor: pointer;
}
.place-info:hover .hover-point {
  opacity: 0.05; 
}
</style>
