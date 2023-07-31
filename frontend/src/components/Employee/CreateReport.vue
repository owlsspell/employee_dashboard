<script setup>
import { reactive, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { base } from "../../../config";
import axios from "axios";
import Modal from "../modal/Modal";
import Loading from "../modal/Loading";
import { reset } from "@formkit/core";

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
const createEmployee = async (fields) => {
  fields = { ...fields, date: Date.now().toString() };
  console.log("fields", fields);
  mutate(fields);
  reset("createEmployee");
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
  <div v-else-if="isLoading">
    <Loading :showModal="isLoading" />
  </div>
  <main>
    <div
      class="relative flex flex-col items-center justify-start overflow-hidden"
    >
      <!-- v-if="!showModal && !isLoading" -->
      <div
        class="w-full p-6 border-t-4 rounded-md shadow-md border-top lg:max-w-lg"
      >
        <h1 class="text-3xl font-semibold text-center mb-4">
          Create new report
        </h1>
        <!-- <form class="space-y-4" @submit.prevent> -->
        <!-- <div v-for="field in fields" :key="field">
            <CustomInput v-model="employee[field]" :field="field" />
          </div> -->
        <FormKit
          type="form"
          id="createEmployee"
          submit-label="Create"
          @submit="createEmployee"
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

          <!-- <div>
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
          </div> -->
        </FormKit>

        <!-- </form> -->
      </div>
    </div>
  </main>
</template>
