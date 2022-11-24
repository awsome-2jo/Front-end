<template>
  <div class="container">
    <div v-if="data">
      <div id="roadview"></div>
      <div class="apt-name">
        <span>{{ data.roadName }} ・ {{ data.buildYear }}년 건축물</span>
        <h1>{{ data.apartmentName }}</h1>
      </div>
      <div class="flex-container">
        <div class="summarize-info icon-data-container">
          <icon-data-box icon="dollar" label="최근 거래가" :value="getLastDeal" />
          <icon-data-box icon="up" label="거래가 추이" value="상승중" />
          <icon-data-box icon="handshake" label="총 거래횟수" :value="`${data.list.length}건`" />
        </div>

        <div class="summarize-info">
          <div class="place-info-area">
            <h3>주요 시설 정보</h3>
            <div>
              <div
                v-for="(item, idx) in getPlaceInfo"
                :key="`local-info-${item.label}`"
                class="place-info drag-block"
                :class="{ odd: (idx + 1) % 2 }"
              >
                <div>{{ item.label }}</div>
                <div>{{ item.value }}곳</div>
              </div>
            </div>
          </div>

          <div class="place-info-area small">
            <h3>항목별 아파트 점수</h3>
            <div>
              <div v-for="item in getScoreInfo" class="score-info drag-block" :key="`score-info-${item.label}`">
                <div>{{ item.label }}</div>
                <div>{{ item.value }}/5⭐</div>
              </div>
            </div>
          </div>
        </div>
        <apt-chart :data="countData" title="거래량" label="m²" header="매물별 거래량 통계" />
        <apt-chart :data="amountData" title="거래가" label="m²" header="매물별 거래가 통계" />
      </div>
    </div>
  </div>
</template>

<script>
import { getDealString } from "@/api/utils.js";
import { getAptDetail } from "@/api/apt";
import { mapState } from "vuex";
import IconDataBox from "../common/IconDataBox.vue";
import AptChart from "@/components/apt/common/AptChart";

/* global kakao */
export default {
  components: { IconDataBox, AptChart },
  name: "AptDetail",
  data() {
    return {
      roadview: null,
      roadviewClient: null,
      data: null,
      amountData: null,
      countData: null,
      place: {
        kindergarden: 0,
        hospital: 0,
        elementarySchool: 0,
        middleSchool: 0,
        highSchool: 0,
        mart: 0,
        subway: 0,
        academy: 0,
        caulturalFacility: 0,
      },
      score: {
        apartment: 3,
        education: 4,
        traffic: 5,
        facility: 4,
      },
    };
  },
  methods: {
    initRoadView() {
      this.roadview = new kakao.maps.Roadview(document.getElementById("roadview")); //로드뷰 객체
      this.roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
    },
    setData() {
      const resolve = (res) => {
        console.log("아파트 상세 정보 요청 성공");
        this.data = res.data;
      };
      const reject = (err) => {
        console.log("아파트 상세 정보 요청을 실패하였습니다!", err);
      };
      getAptDetail(this.target.aptCode, resolve, reject);
    },
    // 아파트 거래량 데이터 가공
    getDealCountData() {
      // {면적, { ...[{ 거래일자, 거래량 }]}}
      let startYear = Number(this.data.buildYear);
      startYear = startYear < 2015 ? 2015 : startYear;

      let data = {};
      for (let item of this.data.list) {
        if (!data[item.area]) {
          data[item.area] = [];
          for (let year = startYear; year <= 2022; year++) {
            data[item.area][year - startYear] = { label: `${year}년`, value: 0 };
          }
        }
        data[item.area][item.dealYear - startYear].value++;
      }
      return data;
    },
    // 아파트 거래가 데이터 가공
    getDealAmountData() {
      // {면적, { ...[{ 거래일자, 거래량 }]}}
      let startYear = Number(this.data.buildYear);
      startYear = startYear < 2015 ? 2015 : startYear;

      let data = {};
      for (let item of this.data.list) {
        if (!data[item.area]) {
          data[item.area] = [];
          for (let year = startYear; year <= 2022; year++) {
            data[item.area][year - startYear] = { label: `${year}년`, value: 0, count: 0 };
          }
        }
        data[item.area][item.dealYear - startYear].count++;
        data[item.area][item.dealYear - startYear].value += Number(item.dealAmount.split(",").join(""));
      }
      for (let area in data) {
        for (let i = 0; i < data[area].length; i++) {
          if (data[area][i].count) data[area][i].value /= data[area][i].count;
          data[area][i].value = Math.round(data[area][i].value);
        }
      }
      console.log(data);
      return data;
    },
  },
  computed: {
    ...mapState("AptStore", ["target", "aptCode"]),
    getLastDeal() {
      let lastDealAmount = this.data.list[this.data.list.length - 1].dealAmount;
      lastDealAmount = lastDealAmount.split(",").join("") - 0;
      let string = getDealString(lastDealAmount);
      if (string.match(/억$/)) return string;
      return string + "만원";
    },
    getPlaceInfo() {
      const arr = [
        { label: "유치원", value: this.place.kindergarden },
        { label: "병원", value: this.place.hospital },
        { label: "초등학교", value: this.place.elementarySchool },
        { label: "지하철역", value: this.place.subway },
        { label: "중・고등학교", value: this.place.middleSchool + this.place.highSchool },
        { label: "마트", value: this.place.mart },
        { label: "학원", value: this.place.academy },
        { label: "문화시설", value: this.place.caulturalFacility },
      ];
      return arr;
    },
    getScoreInfo() {
      const arr = [
        { label: "🏙아파트", value: this.score.apartment },
        { label: "📚교육", value: this.score.education },
        { label: "🚉교통", value: this.score.traffic },
        { label: "🏬시설", value: this.score.facility },
      ];
      return arr;
    },
  },
  watch: {
    target() {
      if (this.target) {
        this.initRoadView();
        let position = this.target.latlng;
        // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
        this.roadviewClient.getNearestPanoId(position, 100, (panoId) => {
          this.roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        });
        this.setData();
      }
    },
    data() {
      this.amountData = this.getDealAmountData();
      this.countData = this.getDealCountData();
    },
  },
  created() {},
  mounted() {
    if (this.target) this.setData();
  },
};
</script>

<style scoped>
.container {
  position: relative;
  flex-grow: 1;
  height: 100%;
  min-width: 550px;
}
.container > div {
  overflow-y: scroll;
  height: calc(100% - 80px);
}
#roadview {
  width: 100%;
  height: 240px;
}
.flex-container {
  display: flex;
  flex-direction: column;
}
.summarize-info {
  display: flex;
  padding: 5px;
  flex-wrap: nowrap;
}
.divider {
  width: 10px;
  height: 10px;
}
.icon-data-container > * {
  flex-grow: 1;
  margin: 0 5px;
  box-sizing: border-box;
}
.place-info-area.small {
  flex: 1 1 33%;
}
.place-info-area {
  flex: 1 1 68%;
  background-color: var(--gray);
  margin: 0 5px;
  padding: 10px;
  color: var(--navy);
  border-radius: 8px;
  box-sizing: border-box;
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
.score-info {
  box-sizing: border-box;
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  font-size: 14px;
  position: relative;
}
.score-info > div:nth-child(2) {
  font-weight: 900;
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
.place-info .hover-point {
  position: absolute;
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
