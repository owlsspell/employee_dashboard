<script setup>
import { onMounted, toRaw } from "vue";
import { getColumnAndCount } from "../../api/fetchers";
import { useQuery } from "@tanstack/vue-query";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
import Loader from "../global/Loader.vue";
import { GridComponent } from "echarts/components";
import { DataZoomComponent } from "echarts/components";

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
]);

provide(THEME_KEY, "light");
// const data = ref();
const fetcher = () => getColumnAndCount("date");
// getColumnAndCount("date").then((res) => (data.value = res));

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["dateChart"],
  queryFn: fetcher,
});

// console.log("data", toRaw(data.value));
console.log(toRaw(data.value));
console.log(data);
console.log(data.value);

onMounted(async () => await fetcher());

const option = ref({
  tooltip: {
    trigger: "axis",
    position: function (pt) {
      return [pt[0], "10%"];
    },
  },
  title: {
    left: "center",
    text: "Date Chart",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    // data: toRaw(data.value).rowArr,
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 20,
    },
    {
      start: 0,
      end: 20,
    },
  ],
  series: [
    {
      // data: toRaw(data.value).timeArr,
      // data: [
      //   [1643925600, 1],
      //   [1644098400, 1],
      //   [1648332000, 1],
      //   [1648760400, 1],
      //   [1649624400, 1],
      //   [1653253200, 1],
      //   [1654030800, 1],
      // ],
      // data: data._rawValue.timeArr,
      data: data.value?.timeArr,
      type: "line",
      smooth: true,
      symbol: "none",
      areaStyle: {},
    },
  ],
});
</script>

<template>
  <Loader :isLoading="isLoading" />
  {{ console.log("Render", data) }}
  {{ console.log("isLoading", isLoading) }}
  <div class="mx-auto w-full pb-6" v-if="!isLoading">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
}
</style>
