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
import VChart from "vue-echarts";
import { ref, watch, onUpdated } from "vue";
import Loader from "../global/Loader.vue";
import { useEmployeesStore } from "../../store/employeesStore";
import { useThemeStore } from "../../store/theme";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const store = useEmployeesStore();
const storeTheme = useThemeStore();

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["countryChart"],
  queryFn: () => getUniqueFields("country"),
  onSuccess: (data) => {
    store.updateChartCountryAndValues(data.data);
    store.updateMaxCountryValue(data.maxValue);
  },
});

const darkMode = ref(false);
const textColor = ref(true);

const option = ref({
  darkMode,
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
    textStyle: {
      color: textColor,
    },
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
onUpdated(() => {
  storeTheme.theme === "light"
    ? (darkMode.value = false)
    : (darkMode.value = true);
  storeTheme.theme === "light"
    ? (textColor.value = "#464646")
    : (textColor.value = true);
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
    <v-chart
      v-show="!isLoading"
      class="chart"
      :option="option"
      autoresize
      :key="storeTheme.theme"
    />
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
  max-height: 530px;
}
</style>
