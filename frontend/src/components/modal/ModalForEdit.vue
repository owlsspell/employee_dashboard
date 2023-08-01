<script setup>
import Loading from "./Loading.vue";

const props = defineProps(["showModal", "isLoaderShow", "userInfo"]);
const emit = defineEmits(["saveData", "close"]);
console.log("isLoaderShow", props.isLoaderShow);
function saveData(data) {
  emit("saveData", data);
}
</script>
<template>
  {{ console.log("isLoaderShow", isLoaderShow) }}
  <Loading :showModal="isLoaderShow" />
  <div class="modal" :open="showModal">
    <div class="modal-box">
      <FormKit
        type="form"
        id="editEmloyee"
        submit-label="Create"
        @submit="saveData"
        :value="userInfo"
        :actions="false"
      >
        <FormKit label="Full name" name="name" id="name" />
        <FormKit
          type="email"
          label="Email"
          name="email"
          id="name"
          validation="required|email"
          validation-visibility="blur"
        />
        <FormKit label="Gender" name="gender" id="gender" />
        <FormKit label="Job" name="job" id="job" />
        <FormKit label="Company" name="company" id="company" />
        <FormKit label="Country" name="country" id="country" />
        <div class="modal-action justify-between items-baseline">
          <FormKit
            type="submit"
            :disabled="isLoaderShow"
            :classes="{
              wrapper: 'w-32',
            }"
          >
            Create
          </FormKit>
          <button class="btn" @click="$emit('close')">Close</button>
        </div>
      </FormKit>
    </div>
  </div>
</template>
