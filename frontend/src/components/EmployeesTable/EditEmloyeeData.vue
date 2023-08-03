<script setup>
import { useMutation } from "@tanstack/vue-query";
import Loading from "../modal/Loading.vue";
import { editEmployeeData } from "../../api/employees";

const props = defineProps(["showModal", "isLoaderShow", "userInfo"]);
const emit = defineEmits(["close", "setLoaderShow", "refetch"]);

const { isLoading, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: async (employee) => editEmployeeData(employee),
  onSuccess: (data) => {
    emit("refetch");
    setTimeout(() => {
      emit("close");
      emit("setLoaderShow", false);
    }, 1000);
  },
  onError: (error) => {
    setTimeout(() => {
      emit("setLoaderShow", false);
    }, 1000);
  },
});

function saveData(data) {
  emit("setLoaderShow", true);
  mutate(data);
}
</script>

<template>
  <Loading
    :showModal="isLoaderShow"
    :isSuccess="isSuccess"
    :isError="isError"
    :error="error"
    successMessage="Success!"
  />
  <div class="modal" :open="showModal">
    <div class="modal-box pt-12">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-4"
        @click="$emit('close')"
      >
        ✕
      </button>
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
