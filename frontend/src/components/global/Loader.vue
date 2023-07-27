<script setup>
defineProps(["isLoading"]);
</script>

<template>
  <div v-if="isLoading" class="w-full h-screen max-h-56 mb-6">
    <span class="loading loading-dots loading-lg mx-auto h-full block"></span>
  </div>
</template>
