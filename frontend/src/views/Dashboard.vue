<script setup>
import ChartLine from "../components/Dashboard/ChartLine.vue";
import ChartPie from "../components/Dashboard/ChartPie.vue";
import WorldMap from "../components/Maps/WorldMap.vue";
</script>

<template class="bg-base-200">
  <div class="h-full grid grid-cols-1 gap-4 m-5 md:grid-cols-2 max-h-[600px]">
    <div
      class="p-4 border border-base-300 rounded-lg shadow-md col-span-1 sm:p-6 h-[600px] shadow-lg"
    >
      <ChartPie />
    </div>
    <div
      class="p-4 border border-base-300 rounded-lg shadow-md col-span-1 sm:p-6 h-[600px] shadow-lg"
    >
      <ChartLine />
    </div>
    <div
      class="p-4 border border-base-300 rounded-lg shadow-md md:col-span-2 sm:p-6 h-[600px] shadow-lg"
    >
      <WorldMap />
    </div>
  </div>
</template>
