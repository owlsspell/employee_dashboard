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
import VChart from "vue-echarts";
import { ref } from "vue";
import Loader from "../global/Loader.vue";
import { GridComponent } from "echarts/components";
import { DataZoomComponent } from "echarts/components";
import { useEmployeesStore } from "../../store/employeesStore";
import { watch } from "vue";
import { getColumnAndCount } from "../../api/charts";

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
]);

const store = useEmployeesStore();

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["dateChart"],
  queryFn: () => getColumnAndCount("date"),
  onSuccess: (data) => {
    store.updateLineChartData(data);
  },
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
  <div class="mx-auto w-full h-full" v-if="!isLoading">
    <v-chart :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 100%;
}
</style>
