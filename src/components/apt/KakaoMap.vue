<template>
  <div id="map"></div>
</template>

<script>
import { getAptList, getDong, getGugun, getSido } from "@/api/apt";
import { mapActions, mapState } from "vuex";
import AptIcon from "@/assets/imgs/AptIcon.js";
import CafeIcon from "@/assets/imgs/cafe.js";
import CultureIcon from "@/assets/imgs/culture.js";
import HospitalIcon from "@/assets/imgs/hospital.js";
import MartIcon from "@/assets/imgs/mart.js";
import SchoolIcon from "@/assets/imgs/school.js";
import StoreIcon from "@/assets/imgs/store.js";
import SubwayIcon from "@/assets/imgs/subway.js";

const placeArr = {
  MT1: { name: "대형마트", icon: MartIcon },
  CS2: { name: "편의점", icon: StoreIcon },
  SC4: { name: "학교", icon: SchoolIcon },
  SW8: { name: "지하철역", icon: SubwayIcon },
  CT1: { name: "문화시설", icon: CultureIcon },
  CE7: { name: "카페", icon: CafeIcon },
  HP8: { name: "병원", icon: HospitalIcon },
};

// 카카오 마커 이미지, 곧 수정할 예정
const imageSrc = require("@/assets/imgs/AptIcon.svg");

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      ps: null,
      geocoder: null,
      imageSize: null,
      markerImage: null,
      lastAddress: "", // 지도 깜빡이 방지용 변수. 이전에 적용한 주소값 저장
      lastRegcode: "",
      lastAddressArr: [],
      markers: {
        apt: [],
        reg: [],
        MT1: [],
        CS2: [],
        SC4: [],
        SW8: [],
        CT1: [],
        CE7: [],
        HP8: [],
      },
      data: {
        apt: [],
        reg: [],
      },
    };
  },
  methods: {
    ...mapActions("AptStore", ["setMap", "setTarget", "setSideX", "setAddress"]),
    // 지도 삽입 메서드
    initMap() {
      console.log("kakao map init");
      this.$el.addEventListener("click", this.zumInReg);
      this.$el.addEventListener("click", this.onClickApt);

      let options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 10, //지도의 레벨(확대, 축소 정도)
      };
      this.map = new kakao.maps.Map(this.$el, options);
      this.geocoder = new kakao.maps.services.Geocoder();
      let imageSize = new kakao.maps.Size(60, 60);
      this.markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      // 지도 불러오기 성공 시 위치 default로 설정하기
      this.setLocation();
      // 지도 이동 이벤트 추가
      kakao.maps.event.addListener(this.map, "idle", this.setCenter);

      // 장소 검색 객체 추가
      this.ps = new kakao.maps.services.Places(this.map);
    },
    // 지도 이동 메서드
    setLocation() {
      const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          // 이동할
          this.map.setLevel(this.dong ? 2 : this.gugun ? 4 : this.sido ? 6 : 12);
          this.map.panTo(new kakao.maps.LatLng(result[0].y, result[0].x));
          this.setCenter();
        }
      };
      let address = [this.sido, this.gugun, this.dong].filter((val) => val).join(" ");
      this.geocoder.addressSearch(address ? address : "서울특별시", callback);
    },
    // 마커 그리기 이벤트
    setMarkers(result, level) {
      let regcode = result[0].code;
      this.lastRegcode = regcode;
      this.lastAddressArr = [result[0].region_1depth_name, result[0].region_2depth_name, result[0].region_3depth_name];

      // 확대 크기(level)에 따라 지역코드 길이 조절
      if (level > 4) this.drawRegMarkers(result[0], level);
      else {
        if (level >= 4) regcode = regcode.slice(0, 5);
        else if (level >= 2) regcode = regcode.slice(0, 7);
        this.getAptMarkers(regcode);
      }
    },
    // 중심좌표 변경 메서드
    async setCenter() {
      let center = this.map.getCenter();
      const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let level = this.map.getLevel();
          this.setMarkers(result, level);
        }
      };
      await this.geocoder.coord2RegionCode(center.getLng(), center.getLat(), callback);
    },
    // 모든 마커 삭제
    resetMarkers(option) {
      for (let arr in this.markers) {
        if (option && (arr === "apt" || arr === "reg")) continue;
        while (this.markers[arr].length) {
          this.markers[arr].shift().setMap(null);
        }
      }
      // this.markers = {
      //   apt: [],
      //   reg: [],
      //   MT1: [],
      //   CS2: [],
      //   SC4: [],
      //   SW8: [],
      //   CT1: [],
      //   CE7: [],
      //   HP8: [],
      // };
    },
    // 지역 마커 그리기
    drawRegMarkers(data, level) {
      let regcode = data.code;
      let address = "";

      const drawMarker = (result, status, item) => {
        if (status === kakao.maps.services.Status.OK) {
          let latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
          let regMarker = new kakao.maps.CustomOverlay({
            map: this.map, // 마커를 표시할 지도
            position: latlng,
            title: item.name,
            // image: this.markerImage, // 마커 이미지
            content: `<div class="map-reg-marker" data-address="${result[0].address.address_name}">${item.name}</div>`,
          });
          this.markers.reg.push(regMarker);
        }
      };
      const resolve = (res) => {
        for (let item of res.data) {
          this.geocoder.addressSearch(address + " " + item.name, (res, stats) => drawMarker(res, stats, item));
        }
        this.data.reg = res.data;
      };
      const reject = (err) => {
        console.log(err);
      };

      if (level < 8) {
        regcode = regcode.slice(0, 5);
        address = data.region_1depth_name + " " + data.region_2depth_name;
        if (address === this.lastAddress) return;
        this.resetMarkers();
        this.lastAddress = address;
        getDong(regcode, resolve, reject);
      } else if (level < 11) {
        regcode = regcode.slice(0, 2);
        address = data.region_1depth_name;
        if (address === this.lastAddress) return;
        this.resetMarkers();
        this.lastAddress = address;
        getGugun(regcode, resolve, reject);
      } else {
        if (address === this.lastAddress) return;
        this.resetMarkers();
        this.lastAddress = address;
        getSido(resolve, reject);
      }
    },
    // 아파트 마커 정보 추출 메서드
    async getAptMarkers(regcode) {
      let params = { regcode: regcode, amount: 100 };
      const resolve = (res) => {
        this.data.apt = [...res.data].sort((a, b) => {
          if (a.lat === b.lat) return a.lng - b.lng;
          return b.lat - a.lat;
        });
      };
      const reject = (err) => console.log(err);
      await getAptList(params, resolve, reject).then(this.drawAptMarkers);
    },
    // 카테고리 정보 추출 메서드
    getPlaceMarkers(opt) {
      // 기존 마커 삭제
      this.resetMarkers(opt);
      for (let category in this.place) {
        if (!this.place[category]) continue;
        let callback = (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            let markers = [];
            for (let item of data) {
              // address_name
              // category_group_code
              // place_name
              // place_url
              // x, y
              let latlng = new kakao.maps.LatLng(item.y, item.x);
              let marker = new kakao.maps.CustomOverlay({
                map: this.map, // 마커를 표시할 지도
                position: latlng,
                title: item.place_name,
                content: `
                <div class="place-marker">
                  ${placeArr[category].icon}
                  <span>${item.place_name}</span>
                </div>`,
              });
              markers.push(marker);
            }
            this.markers[category] = [...this.markers[category], ...markers];
          }
        };
        this.ps.categorySearch(category, callback, { useMapBounds: true });
      }
    },
    // 아파트 마커 그리기
    drawAptMarkers() {
      // 카테고리별 마크 추가
      this.getPlaceMarkers();

      for (let apt of this.data.apt) {
        let latlng = new kakao.maps.LatLng(apt.lat, apt.lng);

        this.markers.apt.push(
          new kakao.maps.CustomOverlay({
            map: this.map, // 마커를 표시할 지도
            position: latlng,
            title: apt.apartmentName,
            content: `
            <div class="apt-marker" data-x="${apt.lng}" data-y="${apt.lat}" data-aptcode="${apt.aptCode}">
              <div class="apt-marker-info">
                <div class="min-deal">${this.getDealString(apt.minDealAmount)}</div>
                <div class="max-deal">~${this.getDealString(apt.maxDealAmount)}</div>
              </div>
              ${AptIcon}
            </div>`,
          })
        );
      }
    },
    // 지역 마커 클릭 이벤트
    zumInReg($event) {
      $event.stopPropagation();
      if ($event.target.className === "map-reg-marker") {
        // 이동할 주소
        let address = $event.target.dataset.address;

        const callback = async (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            this.map.setLevel(this.map.getLevel() - 2);
            this.map.panTo(new kakao.maps.LatLng(result[0].y, result[0].x));
          }
        };
        this.geocoder.addressSearch(address, callback);
      }
    },
    // 아파트 매물 클릭 이벤트
    onClickApt($event) {
      let target = $event.target;
      while (target !== this.$el) {
        if (target.className === "apt-marker") {
          let { x, y, aptcode } = target.dataset;
          // this.map.panTo(new kakao.maps.LatLng(+y, +x));
          let latlng = new kakao.maps.LatLng(+y, +x);
          let apttarget = { aptCode: aptcode, latlng };
          this.setAddress({ code: this.lastRegcode, address: this.lastAddressArr });
          this.setTarget(apttarget);
          break;
        } else target = target.parentNode;
      }
    },
    // 가격 문자열 반환
    getDealString(deal) {
      let urk = Math.round(deal / 10000);
      let marn = deal % 10000;
      let arr = [];
      if (urk) arr.push(`${urk}억`);
      if (marn) arr.push(`${marn}`);
      return arr.join(" ");
    },
  },

  computed: {
    ...mapState("AptStore", ["mapDiv", "sido", "gugun", "dong", "regcode", "sideX", "target", "place"]),
  },
  watch: {
    regcode() {
      this.setLocation();
    },
    sideX() {
      console.log(this.sideX);
      this.$el.style.width = `calc(100% - ${this.sideX}px)`;
      this.map?.relayout();
    },
    target() {
      this.map.setLevel(2);
      this.map.panTo(this.target.latlng);
    },
    place() {
      this.getPlaceMarkers(true);
    },
  },
  mounted() {
    /* global kakao */
    // kakao.maps.load(this.initMap);
    this.initMap();
  },
};
</script>

<style>
#map {
  width: 100%;
  height: calc(100vh - 140px);
  position: absolute;
}
.map-reg-marker {
  background-color: var(--navy);
  color: var(--white);
  font-weight: 900;
  padding: 10px 20px;
  border-radius: 8px;
  opacity: 0.9;
  box-shadow: 1px 1px 5px var(--shadow);
  cursor: pointer;
}
.apt-marker {
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
}
.apt-marker:hover {
  z-index: 2;
  transform: scale(105%);
}
.apt-marker > .apt-marker-info {
  background: var(--navy);
  border-radius: 8px;
  color: var(--white);
  padding: 3px 6px;
  text-align: center;
}
.apt-marker > .apt-marker-info::after {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  margin-left: -5px;
  border-bottom: 10px solid transparent;
  border-left: 5px solid transparent;
  border-top: 10px solid var(--navy);
  border-right: 5px solid transparent;
}
/* .apt-marker > .apt-marker-info h4 {
  margin: 0;
  font-size: 6px;
  text-align: center;
} */
.apt-marker > .apt-marker-info {
  font-size: 1px;
}
.apt-marker > .apt-marker-info .min-deal {
  font-size: 12px;
  font-weight: 900;
}
.apt-marker svg {
  width: 60px;
  height: 60px;
}
.place-marker svg {
  width: 50px;
  height: 50px;
  position: relative;
}
.place-marker span {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  position: absolute;
  opacity: 0;
}
.place-marker:hover span {
  font-size: 8px;
  border-radius: 8px;
  color: var(--white);
  background: var(--navy);
  opacity: 0.9;
  padding: 4px;
}
svg .svg-color {
  fill: var(--navy);
}
</style>
