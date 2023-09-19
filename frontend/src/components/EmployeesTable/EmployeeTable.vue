<script setup>
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import dayjs from "dayjs";
import { getAllEmployees } from "../../api/employees";
import Loader from "../global/Loader.vue";
import Pagination from "../global/Pagination.vue";
import EditEmloyeeData from "../EmployeesTable/EditEmloyeeData.vue";
import { useAuth0 } from "@auth0/auth0-vue";

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
const isOpenUserInfo = ref(false);
const isLoaderShow = ref(false);
const userInfo = ref({});

const pageNumber = ref(1);
const numberOfNotes = ref(10);

const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
  queryKey: ["employees", pageNumber],
  queryFn: () => getAllEmployees(numberOfNotes.value, pageNumber.value),
  keepPreviousData: true,
  refetchOnWindowFocus: false,
});

const { isAuthenticated } = useAuth0();

function handleEditModal(user) {
  isOpenUserInfo.value = true;
  userInfo.value = user;
}

function setLoaderShow(val) {
  isLoaderShow.value = val;
}
</script>

<template>
  <main v-if="!isAuthenticated">You must be logged in</main>
  <main v-else-if="isAuthenticated">
    <Loader :isLoading="isLoading" />
    <!-- <Loading :showModal="isFetching" /> -->
    <div v-if="isError">Something went wrong...</div>
    <div v-if="isOpenUserInfo">
      <EditEmloyeeData
        :showModal="isOpenUserInfo"
        :isLoaderShow="isLoaderShow"
        :userInfo="userInfo"
        @close="isOpenUserInfo = false"
        @setLoaderShow="setLoaderShow"
        @refetch="refetch()"
      />
    </div>
    <div
      class="mx-auto max-w-7xl pb-6"
      v-if="isAuthenticated && data && data.employees.length > 0"
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
          <tbody v-for="(user, index) in data.employees" :key="user.id">
            <tr
              class="hover cursor-pointer"
              @click="() => handleEditModal(user)"
            >
              <td v-for="header in headers" :key="user.id + ' ' + header">
                {{
                  header === "id"
                    ? index + 1 + (pageNumber * numberOfNotes - 10)
                    : header === "date"
                    ? dayjs(Number(user[header])).format("MM/DD/YYYY")
                    : user[header]
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center mt-4">
        <div
          v-if="pageNumber && data && data.employees.length > 0 && !isLoading"
        >
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
