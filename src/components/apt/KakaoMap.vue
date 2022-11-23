<template>
  <div id="map"></div>
</template>

<script>
import { getAptList, getDong, getGugun, getSido } from "@/api/apt";
import { mapActions, mapState } from "vuex";
import AptIcon from "@/assets/imgs/AptIcon.js";

// 카카오 마커 이미지, 곧 수정할 예정
const imageSrc = require("@/assets/imgs/AptIcon.svg");

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      geocoder: null,
      imageSize: null,
      markerImage: null,
      lastAddress: "", // 지도 깜빡이 방지용 변수. 이전에 적용한 주소값 저장
      markers: {
        apt: [],
        reg: [],
      },
      data: {
        apt: [],
        reg: [],
      },
    };
  },
  methods: {
    ...mapActions("AptStore", ["setMap"]),
    // 지도 삽입 메서드
    initMap() {
      this.$el.addEventListener("click", this.zumInReg);

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
      // kakao.maps.event.addListener(this.map, "dragend", this.setCenter);
      kakao.maps.event.addListener(this.map, "bounds_changed", this.setCenter);
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

      // 확대 크기(level)에 따라 지역코드 길이 조절
      if (level >= 5) this.drawRegMarkers(result[0], level);
      else {
        if (level > 4) regcode = regcode.slice(0, 2);
        else if (level > 3) regcode = regcode.slice(0, 5);
        else if (level > 2) regcode = regcode.slice(0, 7);
        this.getAptMarkers(regcode);
      }
    },

    // 중심좌표 변경 메서드
    setCenter() {
      let center = this.map.getCenter();
      const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let level = this.map.getLevel();
          this.setMarkers(result, level);
        }
      };
      this.geocoder.coord2RegionCode(center.getLng(), center.getLat(), callback);
    },

    // 모든 마커 삭제
    resetMarkers() {
      for (let arr in this.markers) {
        for (let marker of this.markers[arr]) {
          marker.setMap(null);
        }
      }
      this.markers = {
        apt: [],
        reg: [],
      };
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

      if (level < 7) {
        regcode = regcode.slice(0, 5);
        address = data.region_1depth_name + " " + data.region_2depth_name;
        if (address === this.lastAddress) return;
        this.lastAddress = address;
        this.resetMarkers();
        getDong(regcode, resolve, reject);
      } else if (level < 11) {
        regcode = regcode.slice(0, 2);
        address = data.region_1depth_name;
        if (address === this.lastAddress) return;
        this.lastAddress = address;
        this.resetMarkers();
        getGugun(regcode, resolve, reject);
      } else {
        if (address === this.lastAddress) return;
        this.lastAddress = address;
        this.resetMarkers();
        getSido(resolve, reject);
      }
    },

    // 아파트 마커 정보 추출 메서드
    getAptMarkers(regcode) {
      let params = { regcode: regcode, amount: 50 };
      const resolve = (res) => {
        res.data.sort((a, b) => {
          if (a.lat === b.lat) return a.lng - b.lng;
          return b.lat - a.lat;
        });
        this.data.apt = res.data;
      };
      const reject = (err) => console.log(err);
      getAptList(params, resolve, reject).then(this.drawAptMarkers);
    },
    // 아파트 마커 그리기
    drawAptMarkers() {
      // 기존 마커 삭제
      this.resetMarkers();

      let aptMarkers = [];
      for (let apt of this.data.apt) {
        let latlng = new kakao.maps.LatLng(apt.lat, apt.lng);
        aptMarkers.push(
          new kakao.maps.CustomOverlay({
            map: this.map, // 마커를 표시할 지도
            position: latlng,
            title: apt.apartmentName,
            content: `
            <div class="apt-marker" data-aptcode="${apt.aptCode}">
              <div class="apt-marker-info">
                <div class="min-deal">${this.getDealString(apt.minDealAmount)}</div>
                <div class="max-deal">~${this.getDealString(apt.maxDealAmount)}</div>
              </div>
              ${AptIcon}
            </div>`,
          })
        );
      }

      this.markers.apt = aptMarkers;
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
    ...mapState("AptStore", ["mapDiv", "sido", "gugun", "dong", "regcode"]),
  },
  watch: {
    regcode() {
      this.setLocation();
    },
  },
  mounted() {
    // Kakao map API 등록하기
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_KEY}&libraries=services`;
    document.head.appendChild(script);

    /* global kakao */
    script.addEventListener("load", () => {
      kakao.maps.load(this.initMap);
    });
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
#map img {
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
.apt-marker svg .svg-color {
  fill: var(--navy);
}
</style>
