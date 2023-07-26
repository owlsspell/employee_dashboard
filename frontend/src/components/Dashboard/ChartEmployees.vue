<script setup>
import { onMounted } from "vue";
import { getUniqueFields } from "../../api/fetchers";
import { useQuery } from "@tanstack/vue-query";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
import Loader from "../global/Loader.vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, "light");

const fetcher = () => getUniqueFields("country");

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["countryChart"],
  queryFn: fetcher,
});

onMounted(async () => await fetcher());

const option = ref({
  title: {
    text: "Traffic Sources",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    // data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "40%"],
      data: data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});
</script>

<template>
  <div class="mx-auto max-w-7xl pb-6" v-if="data && data.length > 0">
    {{ console.log(isLoading) }}
    <Loader :isLoading="isLoading" />
    <v-chart v-if="!isLoading" class="chart" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
}
</style>
