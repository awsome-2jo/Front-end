<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  methods: {
    name: "aptChart",
    fillData() {
      const ctx = document.getElementById("chart").getContext("2d");
      const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ];
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((row) => row.year),
          datasets: [
            {
              label: "Acquisitions by year",
              data: data.map((row) => row.count),
            },
          ],
        },
      });
    },
  },
  mounted() {
    this.fillData();
  },
  data() {
    return {
      myChart: null,
    };
  },
};
</script>

<style>
#chart {
  width: 100%;
  height: 200px;
}
</style>
