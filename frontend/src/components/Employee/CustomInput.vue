<script setup>
defineProps(["modelValue", "field"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="label">
    <span class="text-base label-text capitalize">{{ field }}</span>
  </label>
  <input
    type="text"
    class="w-full input input-bordered"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
