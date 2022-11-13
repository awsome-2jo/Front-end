<template>
  <div
  class="slider"
  ref="slider">
    <div class="range" :style="{left: `${getSize(min)}px`, width: `${getSize(max)-getSize(min)}px`}"></div>
    <div
    class="bounder min drag-block"
    @mousedown="mouseDownBounder(`min`)"
    ref="min-bounder">
      <div class="ball"></div>
      <div class="ball-shadow"></div>
      <div class="input-container">
        <input type="number" :value="getMin" @change="setMin">{{unitText}}
      </div>
    </div>

    <div
    class="bounder max drag-block"
    @mousedown="mouseDownBounder(`max`)"
    ref="max-bounder">
      <div class="ball"></div>
      <div class="ball-shadow"></div>
      <div class="input-container">
        <input type="number" :value="getMax" @change="setMax">{{unitText}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSlider",
  props: {
    unit: Number,
    unitText: String,
    _min: Number,
    _max: Number,
    request: Boolean,
  },
  data() {
    return {
      target: "",
      min: 0,
      max: 0,
    }
  },
  mounted() {
    console.log(this._max)
    this.setMax(null, this._max);
    this.setMin(null, this._min);
  },
  watch: {
    request() {
      if(this.request) this.$emit("set-value", this.min*this.unit, this.max*this.unit);
    }
  },
  methods: {
    // 슬라이더 이동 이벤트
    mouseUpBounder() {
      console.log("mouse up");
      this.target = "";
      this.$refs.slider.removeEventListener("mousemove", this.mouseMoveBounder);
      window.removeEventListener("mouseup", this.mouseUpBounder);
    },
    mouseDownBounder(target) {
      this.target = target;
      console.log("mouse down");
      this.$refs.slider.addEventListener("mousemove", this.mouseMoveBounder);
      window.addEventListener("mouseup", this.mouseUpBounder);
    },
    mouseMoveBounder($event) {
      if(this.target==="max" && this.max < this.min) this.target = "min";
      else if(this.target==="min" && this.max < this.min) this.target = "max";

      if($event.target!==$event.currentTarget) {
        let temp = $event.clientX - 18;
        this[this.target] = this.getSize(temp);
      }
      else this[this.target] = $event.offsetX;

      
      this.$refs[`${this.target}-bounder`].style.left = this.getSize(this[this.target]) - 9 + "px";
    },

    // input 변경 이벤트
    setMin($event, val) {
      if($event) this.min = $event.target.value / this.unit;
      else this.min = val / this.unit;
      if(this.min > this.max) {
        this.max = this.min;
        this.$refs["max-bounder"].style.left = this.getSize(this.max) - 9 + "px";
      }
      this.$refs["min-bounder"].style.left = this.getSize(this.min) - 9 + "px";
    },
    setMax($event, val) {
      if($event) this.max = $event.target.value / this.unit;
      else this.max = val / this.unit;
      if(this.max < this.min) {
        this.min = this.max;
        this.$refs["min-bounder"].style.left = this.getSize(this.min) - 9 + "px";
      }
      this.$refs["max-bounder"].style.left = this.getSize(this.max) - 9 + "px";
    },

    // 범위 체크 이벤트
    getSize(num) {
      return num >= 0 ? num < 300 ? num : 300 : 0;
    }
  },
  computed: {
    getMin() {
      return this.min*this.unit;
    },
    getMax() {
      return this.max*this.unit;
    }
  }
}
</script>

<style scoped>
@keyframes pointer {
  from {
    transform: scale(150%);
    opacity: 0.2;
  }
  to {
    transform: scale(170%);
    opacity: 0.1;
  }
}
.slider {
  box-sizing: content-box;
  width: 300px;
  height: 6px;
  margin: 20px;
  padding: 20px 0;
  display: flex;
  position: relative;
}
.slider::before {
  content: "";
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background-color: var(--darkgray);
  position: absolute;
}

.bounder {
  width: 18px;
  height: 18px;
  bottom: 14px;
  left: -8px;
  position: absolute;
  background-color: 0.1 var(--navy);
  transition: all 0.05s linear;
}
.ball {
  width: 18px;
  height: 18px;
  border-radius: 10px;
  background-color: var(--navy);
  position: absolute;
}
.ball-shadow {
  transform: scale(150%);
  width: 18px;
  height: 18px;
  border-radius: 10px;
  background-color: var(--navy);
  position: absolute;
  opacity: 0.2;
}

.bounder:active .ball-shadow {
  animation: pointer 0.5s infinite alternate;
}
.bounder:hover, .bounder:active  {
  transform: scale(110%);
}

.input-container {
  position: absolute;
  width: 100px;
  height: 20px;
  border-radius: 5px;
  background-color: var(--navy);
  top: -30px;
  left: -40px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
}
.input-container::before {
  content: "";
  position: absolute;
  bottom: -9px;
  width: 0;
  height: 0;
  border-bottom: 5px solid transparent;
  border-top: 5px  solid var(--navy);
  border-left: 5px solid transparent;
  border-right: 5px  solid transparent;
}
.input-container input {
  width: 55px;
  text-align: center;
  border: 0;
  background-color: var(--navy);
  color: var(--white);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input:focus {
  outline: none;
}

.range {
  position: absolute;
  height: 6px;
  border-radius: 3px;
  background-color: var(--navy);
}
</style>