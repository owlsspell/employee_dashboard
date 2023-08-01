div
<script setup>
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import dayjs from "dayjs";
import { getAllEmployees, editEmployeeData } from "../../api/fetchers";
import Loader from "../global/Loader.vue";

import Pagination from "../global/Pagination.vue";
import ModalForEdit from "../modal/ModalForEdit.vue";
import { base } from "../../../config";
import Loading from "../modal/Loading.vue";

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
console.log("isOpenUserInfo", isOpenUserInfo);
const pageNumber = ref(1);
const numberOfNotes = ref(10);
const { isLoading, isError, data, error, refetch } = useQuery({
  queryKey: ["employees", pageNumber],
  queryFn: () => getAllEmployees(numberOfNotes.value, pageNumber.value),
  keepPreviousData: true,
  refetchOnWindowFocus: false,
});
const { isLoadingMut, isErrorMut, errorMut, isSuccess, mutate } = useMutation({
  mutationFn: async (employee) => editEmployeeData(employee),
  onSuccess: (data) => {
    isOpenUserInfo.value = false;
    isLoaderShow.value = false;
    refetch();
  },
  onError: (error) => {},
});
function handleEditModal(user) {
  isOpenUserInfo.value = true;
  userInfo.value = user;
}
function saveData(data) {
  isLoaderShow.value = true;

  mutate(data);
}

console.log("isLoadingMut", isLoadingMut);
</script>

<template>
  <main>
    <Loader :isLoading="isLoading" />

    <div v-if="isError">Something went wrong...</div>
    <div v-if="isOpenUserInfo">
      <ModalForEdit
        :showModal="isOpenUserInfo"
        :isLoaderShow="isLoaderShow"
        :userInfo="userInfo"
        @saveData="saveData"
        @close="isOpenUserInfo = false"
      />
    </div>
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
          <tbody v-for="(user, index) in data.employees" :key="user.id">
            <tr
              class="hover cursor-pointer"
              @click="() => handleEditModal(user)"
            >
              <td v-for="header in headers" :key="user.id + ' ' + header">
                {{
                  header === "id"
                    ? index + 1
                    : header === "date"
                    ? dayjs(Number(user[header])).format("MM/DD/YYYY")
                    : user[header]
                }}
              </td>
            </tr>
          </tbody>
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
