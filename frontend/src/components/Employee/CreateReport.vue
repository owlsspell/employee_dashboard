<script setup>
import { reactive, ref, toRaw, watch } from "vue";
import CustomInput from "./CustomInput.vue";
import { useMutation } from "@tanstack/vue-query";
import { base } from "../../../config";
import axios from "axios";
import Modal from "../modal/Modal.vue";

let showModal = ref(false);

const fields = ["name", "email", "gender", "job", "company", "country"];
const inputs = fields.reduce((target, key) => {
  target[key] = "";
  return target;
}, {});
const employee = reactive(inputs);

const { isLoading, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: async (newEmployee) => {
    await axios.post(base + "createReport", newEmployee).then((response) => {
      return response;
    });
  },
  onSuccess: (data) => {
    showModal.value = true;
  },
  onError: (error) => {
    showModal.value = true;
  },
});
const createEmployee = async (data) => {
  data = { ...data, date: Date.now().toString() };
  mutate(toRaw(data));
};

const handleButton = () => {
  createEmployee(employee);
};
</script>

<template>
  <div v-if="showModal">
    <Modal
      :showModal="showModal"
      @click="showModal = false"
      :status="{ isError, error, isSuccess }"
    />
  </div>
  <main>
    <div
      class="relative flex flex-col items-center justify-start overflow-hidden"
      v-if="!showModal"
    >
      <div
        class="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg"
      >
        <h1 class="text-3xl font-semibold text-center text-gray-700">
          Create new report
        </h1>
        <form class="space-y-4" @submit.prevent>
          <div v-for="field in fields" :key="field">
            <CustomInput v-model="employee[field]" :field="field" />
          </div>

          <div>
            <button
              class="btn btn-block"
              @click="handleButton"
              :disabled="isLoading"
            >
              Create
              <span
                v-show="isLoading"
                class="loading loading-dots loading-md"
              ></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
