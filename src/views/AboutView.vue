<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="color" :value="color" @change="setColor"/>
  </div>
</template>
<script>
export default {
    name: "ABoutView",
    data() {
      return {
        color: "#1c256f",
      }
    },
    methods: {
      setColor($event) {
        this.color = $event.target.value;
        
        let {r, g, b} = this.hexToRgb();
        let grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
        console.log(grayscale);
        if(grayscale > 190) {
          document.documentElement.style.setProperty("--white", "#000");
          document.documentElement.style.setProperty("--black", "#fff");
        }
        document.documentElement.style.setProperty("--navy", $event.target.value);
      },
      hexToRgb() {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.color);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }
    },
};
</script>

