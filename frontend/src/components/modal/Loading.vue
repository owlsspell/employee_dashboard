<script setup>
defineProps(["showModal"]);
</script>

<template>
  <div class="modal" :open="showModal">
    <div class="modal-box max-w-max flex">
      <span class="text-lg pr-5">Please wait</span>
      <span class="loading loading-dots loading-md"></span>
    </div>
  </div>
</template>
