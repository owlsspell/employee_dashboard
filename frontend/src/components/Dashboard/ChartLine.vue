<script setup>
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
import { useEmployeesStore } from "../../store/employeesStore";
import { watch } from "vue";

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

const store = useEmployeesStore();

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["dateChart"],
  queryFn: () => store.updateLineChartData(),
});

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
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
  },
  dataZoom: [
    {
      type: "inside",
      start: 65,
      end: 100,
    },
    {
      start: 65,
      end: 100,
    },
  ],
  series: [
    {
      data: null,
      type: "line",
      smooth: true,
      symbol: "none",
      areaStyle: {},
    },
  ],
});

watch(
  () => store.lineChartData,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      option.value.series[0].data = null;
      option.value.series[0].data = store.lineChartData;
    }
  },
  { immediate: true }
);
</script>

<template>
  <Loader :isLoading="isLoading" />
  <div class="mx-auto w-full h-screen" v-if="!isLoading">
    <v-chart :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 100%;
}
</style>
