<script setup>
import { reactive, ref, toRaw } from "vue";
import CustomInput from "./CustomInput.vue";
import { useMutation } from "@tanstack/vue-query";
import { base } from "../../../config";
import axios from "axios";

const fields = ["name", "email", "gender", "job", "company", "country", "date"];
const inputs = fields.reduce((target, key) => {
  target[key] = "";
  return target;
}, {});
const employee = reactive(inputs);

const { isLoading, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: async (newEmployee) =>
    await axios.post(base + "createReport", newEmployee).then((response) => {
      console.log("response", response);
      return response;
    }),
});
const createEmployee = async (data) => {
  mutate(toRaw(data));
  console.log("employee", toRaw(data));
};
</script>

<template>
  <main>
    <span v-if="isLoading">Adding Employee...</span>
    <span v-else-if="isError">An error occurred: {{ error.message }}</span>
    <span v-else-if="isSuccess">Employee added!</span>
    <div
      class="relative flex flex-col items-center justify-start overflow-hidden"
      v-if="!isLoading"
    >
      <div
        class="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg"
      >
        <h1 class="text-3xl font-semibold text-center text-gray-700">
          Create new report
        </h1>
        <form class="space-y-4" @submit.prevent>
          <div v-for="field in fields" key="field">
            <!-- <label class="label">
              <span class="text-base label-text capitalize">{{ field }}</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              class="w-full input input-bordered"
            /> -->
            <CustomInput v-model="employee[field]" :field="field" />
          </div>

          <div>
            <button class="btn btn-block" @click="createEmployee(employee)">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
