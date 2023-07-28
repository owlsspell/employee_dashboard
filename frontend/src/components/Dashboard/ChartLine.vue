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
console.log("!!!!!!!store", store.lineChartData);
const { isLoading, isError, data, error } = useQuery({
  queryKey: ["dateChart"],
  queryFn: () => getColumnAndCount("date"),
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
      data: null,
      type: "line",
      smooth: true,
      symbol: "none",
      areaStyle: {},
    },
  ],
});

watch(
  data,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      console.log("newValue", newValue);
      option.value.series[0].data = null;
      option.value.series[0].data = newValue.timeArr;
      store.updateLineChartData();
    }
  },
  { immediate: true }
);
</script>

<template>
  <Loader :isLoading="isLoading" />
  <div
    class="mx-auto w-full pb-6"
    v-if="!isLoading && typeof data !== 'undefined'"
  >
    <v-chart :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
}
</style>
