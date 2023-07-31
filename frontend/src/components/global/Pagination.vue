<script setup>
import usePaginator from "vue-use-paginator";
import { ref, watch } from "vue";

const props = defineProps(["numberOfNotes", "count"]);
const emit = defineEmits(["click"]);

const count = props.count;
const numberOfNotes = props.numberOfNotes;

const {
  page,
  pageSize,
  numPages,
  numItems,
  numButtons,
  slice,
  buttons,
  hasPrev,
  hasNext,
  goStart,
  goPrev,
  goNext,
  goEnd,
} = usePaginator({
  pageSize: numberOfNotes,
  numItems: count,
  numButtons: 6,
});

watch([page, pageSize], ([newPage, newPageSize]) => {
  emit("click", newPage);
});
</script>

<template>
  <ol class="join">
    <li
      class="join-item btn"
      :class="!hasPrev && 'btn-disabled'"
      @click="goStart"
    >
      {{ "<<" }}
    </li>
    <li
      class="join-item btn"
      :class="!hasPrev && 'btn-disabled'"
      @click="goPrev"
    >
      {{ "<" }}
    </li>
    <li
      v-for="button in buttons"
      :key="button.page"
      class="join-item btn"
      :class="{ 'btn-active': button.active }"
      @click="page = button.page"
    >
      {{ button.ellipsis ? "..." : button.page }}
    </li>

    <li
      class="join-item btn"
      :class="!hasNext && 'btn-disabled'"
      @click="goNext"
    >
      {{ ">" }}
    </li>
    <li
      class="join-item btn"
      :class="!hasNext && 'btn-disabled'"
      @click="goEnd"
    >
      {{ ">>" }}
    </li>
  </ol>
</template>
