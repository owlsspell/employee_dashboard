<script setup>
import bg from "/images/bg/bg-1.jpg";
</script>

<template>
  <div
    class="hero min-h-[600px] bg-fixed bg-center bg-cover"
    :style="{ 'background-image': `url(${bg})` }"
  >
    <div class="hero-overlay"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <p class="mb-5 text-md">Hello there</p>
        <h1 class="mb-5 text-6xl font-bold">Welcome to the vue app</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fuggles&display=swap");

h1 {
  font-family: "Fuggles", cursive;
}
</style>
