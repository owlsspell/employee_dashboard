<script setup>
import { useQuery } from "@tanstack/vue-query";
import { onMounted } from "vue";
import * as dayjs from "dayjs";
import { getAllEmployees } from "../api/fetchers";
import Loader from "./global/Loader.vue";

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

const fetcher = () => getAllEmployees();

onMounted(() => {
  fetcher();
});
const { isLoading, isError, data, error } = useQuery({
  queryKey: ["employees"],
  queryFn: fetcher,
});
</script>

<template>
  <main>
    <Loader :isLoading="isLoading" />
    <div v-if="isError">Something went wrong...</div>
    <div class="mx-auto max-w-7xl pb-6" v-if="data && data.length > 0">
      <div class="overflow-x-auto">
        <table class="table table-xs">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header">
                {{ header === "id" ? "#" : header }}
              </th>
            </tr>
          </thead>
          <tbody v-for="user in data" :key="user.id">
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
    </div>
  </main>
</template>
