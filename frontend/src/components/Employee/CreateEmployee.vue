<script setup>
import { reactive, ref } from "vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import Modal from "../modal/Modal.vue";
import Loading from "../modal/Loading.vue";
import { reset } from "@formkit/core";
import { createEmployee, getCountries } from "../../api/employees";

let showModal = ref(false);

// https://restcountries.com/v3.1/all?fields=name
const { data } = useQuery({
  queryKey: ["countries"],
  queryFn: () => getCountries(),
  keepPreviousData: true,
});

const fields = ["name", "email", "gender", "job", "company", "country"];
const inputs = fields.reduce((target, key) => {
  target[key] = "";
  return target;
}, {});

const employee = reactive(inputs);

const { isLoading, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: (newEmployee) => createEmployee(newEmployee),
  onSuccess: (data) => {
    showModal.value = true;
  },
  onError: (error) => {
    showModal.value = true;
  },
});
const handleSubmit = async (fields) => {
  fields = { ...fields, date: Date.now().toString() };
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
        <FormKit
          type="form"
          id="createEmployee"
          submit-label="Create"
          @submit="handleSubmit"
        >
          <FormKit
            label="Full name"
            name="name"
            id="name"
            validation="required|name"
          />
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

          <FormKit
            v-if="data"
            type="select"
            label="Country"
            name="country"
            id="country"
            :options="data"
            placeholder="Select a country"
            validation="required|country"
          />
        </FormKit>
      </div>
    </div>
  </main>
</template>
