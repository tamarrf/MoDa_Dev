<template>
    <highcharts class="chart" :options="chartOptions"></highcharts>
</template>


<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import exportdata from "highcharts/modules/export-data";

Exporting(Highcharts);
exportdata(Highcharts);

export default {
  name: "datalog-chart",
  components: {
    highcharts: Chart,
  },
  data: () => ({
    chartOptions: {
      chart: {
        zoomType: "x",
        panning: true,
        panKey: "shift",
        resetZoomButton: {
          theme: {
            display: "none",
          },
        },
      },
      colors: ["#77a1e5", "#2c3e50"],
      title: {
        text: null,
        style: {
          "font-family": "Avenir, Helvetica, Arial, sans-serif",
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          color: "#2c3e50",
          "font-weight": "bold",
          "font-size": "100%",
        },
      },
      xAxis: {
        type: "datetime",
        tickInterval: 86400 * 10, // 1000 for 1 ms then 10 is 100ms
        labels: {
          rotation: 60,
        },
      },
      yAxis: {
        max: 1000,
        tickAmount: 5
      },
      time: {
        useUTC: false,
      },
      series: [],
    },
  }),
};
</script>

<style scoped>
.chart{
    height: 100%;
    width: 100%;
}
</style>

