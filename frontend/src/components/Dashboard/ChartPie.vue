<script setup>
import { getUniqueFields } from "../../api/charts";
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
const { isLoading, isError, data, error } = useQuery({
  queryKey: ["countryChart"],
  queryFn: () => getUniqueFields("country"),
});

const option = ref({
  title: {
    text: "Traffic Sources",
    left: "center",
    textStyle: {
      // color: theme === "dark" ? "#EEF1FA" : "#464646",
      // color: "inherit",
      fontSize: 18,
      fontWeight: "bold",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "horizontal",
    left: "left",
    top: "40px",
    // data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "55%"],
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
  <Loader :isLoading="isLoading" />
  <div class="mx-auto w-full" v-if="data && data.length > 0 && !isLoading">
    <Loader :isLoading="isLoading" />
    <v-chart v-if="!isLoading" class="chart" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
}
</style>
