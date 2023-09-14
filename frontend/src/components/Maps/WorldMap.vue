<script setup>
import { use, registerMap } from "echarts/core";
import { MapChart } from "echarts/charts";
import VChart, { THEME_KEY } from "vue-echarts";
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  ToolboxComponent,
  GeoComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import world_map from "../../../custom.geo.json";
import { computed, shallowRef, watch } from "vue";
import { ScatterChart, EffectScatterChart } from "echarts/charts";
import { useQuery } from "@tanstack/vue-query";
import { getUniqueFields } from "../../api/charts";
import { useEmployeesStore } from "../../store/employeesStore";
use([
  ScatterChart,
  EffectScatterChart,

  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  ToolboxComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
]);

const store = useEmployeesStore();

const dataLength = computed(
  () => JSON.parse(JSON.stringify(store.chartCountryAndValues)).length
);

registerMap("world", world_map);

const map = shallowRef(null);

const option = shallowRef({
  // textStyle: {
  //   fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
  //   fontWeight: 300,
  // },
  // backgroundColor: "#404a59",
  title: {
    text: "Users countries",
    subtext: "",
    left: "center",
    textStyle: {
      // color: "#fff",
    },
  },
  tooltip: {
    trigger: "item",
  },
  visualMap: {
    orient: "horizontal",
    left: "right",
    min: 1,
    max: store.maxCountryValue,
    inRange: {
      color: [
        "#313695",
        "#4575b4",
        "#74add1",
        "#abd9e9",
        "#e0f3f8",
        "#ffffbf",
        "#fee090",
        "#fdae61",
        "#f46d43",
        "#d73027",
        "#a50026",
      ],
    },
    text: ["High", "Low"],
    calculable: true,
  },
  series: [
    {
      name: "Users in",
      type: "map",
      roam: true,
      map: "world",
      emphasis: {
        label: {
          show: true,
        },
      },
      data: store.chartCountryAndValues,
    },
  ],
});

watch(
  () => store.chartCountryAndValues,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      option.value.series[0].data = null;
      option.value.series[0].data = store.chartCountryAndValues;
      option.value.visualMap.max = store.maxCountryValue;
    }
  },
  { immediate: true }
);
</script>

<template>
  <Loader :isLoading="dataLength === 0" />
  <div class="mx-auto w-full h-[600px]" v-if="dataLength > 0">
    <v-chart ref="map" class="chart" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  height: 100%;
  max-height: 530px;
}
</style>
