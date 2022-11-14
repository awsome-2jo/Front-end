<template>
  <main class="home">
    <text-input :value="text" @on-change="setText" placeholder="아파트명을 입력해주세요" />
    {{ text }}
    <toggle-button :value="bool" @event="setBool" />
    <checkbox-button :value="bool" @event="setBool" text="연습 체크박스" />
    <select-box :select="select" :options="options" @on-change="setSelect" />
    <multi-slider :_min="min" :_max="max" :unit="unit" unitText="만원" @set-value="setValue" :request="request" />

    <round-button @event="sendRequest" text="값 받기" />
    <p>min : {{ min }}</p>
    <p>max : {{ max }}</p>
  </main>
</template>

<script>
import TextInput from "@/components/common/TextInput";
import ToggleButton from "../components/common/ToggleButton.vue";
import CheckboxButton from "../components/common/CheckboxButton.vue";
import SelectBox from "../components/common/SelectBox.vue";
import MultiSlider from "@/components/common/MultiSlider.vue";
import RoundButton from "@/components/common/RoundButton.vue";

export default {
  components: { TextInput, ToggleButton, CheckboxButton, SelectBox, MultiSlider, RoundButton },
  name: "HomeView",
  data() {
    return {
      text: "",
      bool: false,
      select: "default",
      options: ["속성 1", "속성 2", "속성 3", "속성 4", "속성 5", "속성 6", "속성 7"],
      min: 8000,
      max: 120000,
      unit: 1000,
      request: false,
    };
  },
  methods: {
    setText(text) {
      this.text = text;
    },
    setBool() {
      this.bool = !this.bool;
    },
    setSelect(select) {
      this.select = select;
    },
    setValue(min, max) {
      this.min = min;
      this.max = max;
      this.request = false;
    },
    sendRequest() {
      this.request = true;
    },
  },
};
</script>
