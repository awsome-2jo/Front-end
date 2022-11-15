<template>
  <div class="container">
    <div class="img-container">
      <img :src="require(`@/assets/imgs/apt-${(+data.no)%6+1}.jpg`)">
    </div>
    <div class="info-container">
      <span class="dong">{{data.dong}}</span>
      <h4 class="name">{{data.apartmentName}}</h4>

      <div class="tag-container">
        <div class="tag edu">학원가 👩🏻‍🏫</div>
        <div class="tag e-school">초등학교 🏫</div>
        <div class="tag m-h-school">중・고등학교 🏫</div>
        <!-- <div class="tag hot-place">번화가 🏬</div>
        <div class="tag medical">의료시설 🏥</div>
        <div class="tag new">신축 🆕</div>
        <div class="tag util">편의시설 🏪</div>
        <div class="tag police">경찰서 🚔</div> -->
      </div>

      <p class="range">
        <font-awesome-icon icon="fa-solid fa-sack-dollar" class="icon" />
        {{data.minDealAmount}}만원 ~ {{data.maxDealAmount}}만원
      </p>
      <p class="range">
        <font-awesome-icon icon="fa-solid fa-maximize" class="icon" />
        <!-- <font-awesome-icon icon="fa-solid fa-house-chimney-window" /> -->
        {{data.minArea}}m² ~ {{data.maxArea}}m²
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AptItem",
  props: {
    data: Object,
  },
  created() {
    console.log(this.data);
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 10px 0;
  background-color: var(--white);
  border-bottom: 1px solid var(--gray);
  display: flex;
}
.info-container {
  flex-grow: 1;
  flex-basis: 1;
}
.info-container > * {
  margin: 0;
}
.name {
  font-size: 18px;
  margin-bottom: 4px;
}
.dong {
  font-size: 12px;
}
.range {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin: 3px;
}
.tag-container {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid var(--gray);
}
.tag {
  padding: 4px 10px;
  margin: 0 4px 4px 0;
  border-radius: 12px;
  background-color: var(--gray);
  color: var(--navy);
  font-size: 11px;
  font-weight: 900;
  width: fit-content;
}
.range > .icon {
  background-color: var(--white);
  padding: 5px;
  margin-right: 5px;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  color: var(--navy);
}
.img-container {
  max-width: 140px;
  width: 100%;
  height: 140px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  margin-right: 15px;
}
.img-container > * {
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
