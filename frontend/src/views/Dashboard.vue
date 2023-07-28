<script setup>
import ChartLine from "../components/Dashboard/ChartLine.vue";
import ChartPie from "../components/Dashboard/ChartPie.vue";
</script>

<template>
  <div class="grid grid-cols-2 gap-4 m-5">
    <ChartPie />
    <ChartLine />
  </div>
</template>
