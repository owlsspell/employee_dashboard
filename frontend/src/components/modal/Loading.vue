<script setup>
defineProps(["showModal", "isSuccess", "isError", "error", "successMessage"]);
</script>

<template>
  <div class="modal z-[1000]" :open="showModal" v-if="showModal">
    <div class="modal-box max-w-max flex">
      <div v-if="isSuccess">
        <span class="text-lg pr-5">{{ successMessage }}</span>
      </div>
      <div v-else-if="isError">
        <span class="text-lg pr-5"
          >Something went wrong: {{ error && error.response.data }}</span
        >
      </div>
      <div v-else>
        <span class="text-lg pr-5">Please wait</span>
        <span class="loading loading-dots loading-md"></span>
      </div>
    </div>
  </div>
</template>
