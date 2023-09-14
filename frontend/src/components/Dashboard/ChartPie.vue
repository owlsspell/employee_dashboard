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
import { ref, provide, watch } from "vue";
import Loader from "../global/Loader.vue";
import { useEmployeesStore } from "../../store/employeesStore";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const store = useEmployeesStore();
provide(THEME_KEY, "light");

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["countryChart"],
  queryFn: () => getUniqueFields("country"),
  onSuccess: (data) => {
    store.updateChartCountryAndValues(data.data);
    store.updateMaxCountryValue(data.maxValue);
  },
});

const option = ref({
  title: {
    text: "Traffic Sources",
    left: "center",
    textStyle: {
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
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "65%"],
      data: store.chartCountryAndValues,
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

watch(
  () => store.chartCountryAndValues,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      option.value.series[0].data = null;
      option.value.series[0].data = store.chartCountryAndValues;
    }
  },
  { immediate: true }
);
</script>

<template>
  <Loader :isLoading="isLoading" />
  <div class="mx-auto w-full" v-if="!isLoading">
    <Loader :isLoading="isLoading" />
    <v-chart v-show="!isLoading" class="chart" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
  max-height: 530px;
}
</style>
