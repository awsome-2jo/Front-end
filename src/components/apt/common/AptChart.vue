<template>
  <div class="chart-container">
    <h2>{{header}}</h2>
    <canvas :id="title"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { hexToRgb } from "@/api/utils";
Chart.register(...registerables);
export default {
  methods: {
    fillData() {
      const ctx = document.getElementById(this.title).getContext("2d");

      let datasets = [];
      let total = [];
      let labels = [];
      let i = 0.2;
      let {r, g, b} = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--navy'));

      for(let set in this.data) {
        let data = {
          label: `${set}${this.label}`,
          data: this.data[set].map((row)=> row.value),
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${i})`,
          type: 'bar',
        }
        this.data[set].forEach((e,i) => total[i] = total[i] ? total[i]+e.value : e.value);
        datasets.push(data);
        i += i>=1? 0 : 0.08;
        if(labels.length) continue;
        labels = this.data[set].map((row)=> row.label)
      }

      console.log(total)
      datasets.push({
        label: `전체`,
        data: total,
        borderColor: `rgba(${r}, ${g}, ${b}, 1)`,
        backgroundColor: `rgba(${r}, ${g}, ${b}, 1)`,
        type: `line`,
      })

      this.myChart = new Chart(ctx, {
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    changeData() {
      let datasets = [];
      let total = [];
      let labels = [];
      let i = 0.2;
      let {r, g, b} = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--navy'));

      for(let set in this.data) {
        let data = {
          label: `${set}${this.label}`,
          data: this.data[set].map((row)=> row.value),
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${i})`,
          type: 'bar',
        }
        this.data[set].forEach((e,i) => total[i] = total[i] ? total[i]+e.value : e.value);
        datasets.push(data);
        i += i>=1? 0 : 0.08;
        if(labels.length) continue;
        labels = this.data[set].map((row)=> row.label)
      }

      console.log(total)
      datasets.push({
        label: `전체`,
        data: total,
        borderColor: `rgba(${r}, ${g}, ${b}, 1)`,
        backgroundColor: `rgba(${r}, ${g}, ${b}, 1)`,
        type: `line`,
      })
      this.myChart.data.datasets = datasets;
      this.myChart.data.labels = labels;
      this.myChart.update()
    }
  },
  mounted() {
    this.fillData();
  },
  watch: {
    data() {
      console.log("change!!!!!!!!!")
      
      this.changeData();
    }
  },
  data() {
    return {
      myChart: null,
    };
  },
  props: {
    header: {
      type: String,
      default: "header"
    },
    data: {
      type: Object
    },
    title: {
      type: String,
      default: "차트",
    },
    label: {
      type: String,
      default: "차트"
    }
  }
};
</script>

<style scoped>
.chart-container {
  padding:10px;
}
#chart {
  width: 100%;
  height: auto;
}
h2 {
  background-color: var(--navy);
  margin-top: 25px;
  padding: 15px;
  font-size: 18px;
  color: var(--white);
  position: relative;
}
</style>
