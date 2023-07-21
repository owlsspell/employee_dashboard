<script setup>
import EmployeeTable from "../components/EmployeeTable.vue";
import { ref } from "vue";
import CreateReport from "../components/Employee/CreateReport.vue";

const isOpen = ref(false);

const setOpen = (value) => (isOpen.value = value);
</script>

<template>
  <div class="sm:px-6 lg:px-8">
    <div class="w-full">
      <button
        class="btn btn-xs block normal-case my-3 ml-auto mr-0"
        @click="setOpen(!isOpen)"
      >
        {{ isOpen ? "Back" : "New report" }}
      </button>
    </div>
    <div v-show="isOpen">
      <CreateReport />
    </div>
    <div v-show="!isOpen">
      <EmployeeTable :setOpen="setOpen" />
    </div>
  </div>
</template>
