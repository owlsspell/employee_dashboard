<script setup>
import Card from "./Card.vue";
</script>

<template>
  <div class="flex justify-center flex-wrap my-4">
    <Card
      dataImage="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop="
    >
      <template #header>
        <h1>Canyons</h1>
      </template>
      <template #content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p></template
      >
    </Card>
    <Card
      dataImage="https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="
    >
      <template #header>
        <h1>Beaches</h1>
      </template>
      <template #content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p></template
      >
    </Card>
  </div>
</template>
