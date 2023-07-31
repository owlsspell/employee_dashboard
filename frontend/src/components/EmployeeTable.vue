div
<script setup>
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import dayjs from "dayjs";
import { getAllEmployees } from "../api/fetchers";
import Loader from "./global/Loader.vue";

import Pagination from "./global/Pagination.vue";

defineProps({
  setOpen: Function,
});

const headers = [
  "id",
  "name",
  "email",
  "gender",
  "job",
  "company",
  "country",
  "date",
];
const pageNumber = ref(1);
const numberOfNotes = ref(10);
const { isLoading, isError, data, error } = useQuery({
  queryKey: ["employees", pageNumber],
  queryFn: () => getAllEmployees(numberOfNotes.value, pageNumber.value),
  keepPreviousData: true,
  refetchOnWindowFocus: false,
});
</script>

<template>
  <main>
    <Loader :isLoading="isLoading" />
    <div v-if="isError">Something went wrong...</div>
    <div
      class="mx-auto max-w-7xl pb-6"
      v-if="data && data.employees.length > 0"
    >
      <div class="overflow-x-auto">
        <table class="table table-xs">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header">
                {{ header === "id" ? "#" : header }}
              </th>
            </tr>
          </thead>
          <tbody v-for="user in data.employees" :key="user.id">
            <tr>
              <td v-for="header in headers" :key="user.id + ' ' + header">
                {{
                  header === "date"
                    ? dayjs(Number(user[header])).format("MM/DD/YYYY")
                    : user[header]
                }}
              </td>
            </tr>
          </tbody>
          <!-- <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </tfoot> -->
        </table>
      </div>
      <div class="flex justify-center mt-3">
        <div v-if="pageNumber && data && !isLoading">
          <Pagination
            :pageNumber="pageNumber"
            :count="data.count"
            :numberOfNotes="numberOfNotes"
            @click="(currentPage) => (pageNumber = currentPage)"
          />
        </div>
      </div>
    </div>
  </main>
</template>
