<script setup>
import EmployeeTable from "../components/EmployeesTable/EmployeeTable.vue";
import { ref } from "vue";
import CreateReport from "../components/Employee/CreateReport.vue";

const isOpen = ref(false);

const setOpen = (value) => (isOpen.value = value);
</script>

<template>
  <div class="sm:px-6 lg:px-8">
    <div class="w-full my-3">
      <div class="flex justify-end">
        <div class="flex">
          <button
            class="btn btn-xs block normal-case mr-4"
            @click="setOpen(!isOpen)"
          >
            {{ isOpen ? "Back" : "New report" }}
          </button>
        </div>
      </div>
    </div>
    <div v-show="isOpen">
      <CreateReport />
    </div>
    <div v-show="!isOpen">
      <EmployeeTable :setOpen="setOpen" />
    </div>
  </div>
</template>
