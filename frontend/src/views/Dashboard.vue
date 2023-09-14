<script setup>
import ChartLine from "../components/Dashboard/ChartLine.vue";
import ChartPie from "../components/Dashboard/ChartPie.vue";
import WorldMap from "../components/Maps/WorldMap.vue";
</script>

<template>
  <div class="h-full grid grid-cols-1 gap-4 m-5 md:grid-cols-2">
    <ChartPie />
    <ChartLine />
  </div>
  <WorldMap />
</template>
