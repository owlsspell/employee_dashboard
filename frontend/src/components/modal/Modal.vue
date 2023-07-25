<script setup>
defineProps(["showModal", "status"]);
defineEmits(["click"]);
</script>

<template>
  <div class="modal" :open="showModal">
    <form class="modal-box" @submit.prevent>
      <div class="mx-auto max-w-7xl pb-6 h-full">
        <p class="py-4" v-if="status.isError">
          An error occurred: {{ status.error.response.data }}
        </p>
        <p class="py-4" v-else-if="status.isSuccess">
          The employee is added into the database
        </p>
      </div>
      <div class="modal-action">
        <button class="btn" @click="$emit('click')">Close</button>
      </div>
    </form>
  </div>
</template>
