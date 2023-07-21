<script setup>
const fields = ["name", "email", "gender", "job", "company", "country", "date"];
</script>

<template>
  <main>
    <div
      class="relative flex flex-col items-center justify-start overflow-hidden"
    >
      <div
        class="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg"
      >
        <h1 class="text-3xl font-semibold text-center text-gray-700">
          Create new report
        </h1>
        <form class="space-y-4">
          <div v-for="field in fields" key="field">
            <label class="label">
              <span class="text-base label-text capitalize">{{ field }}</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              class="w-full input input-bordered"
            />
          </div>
          <div>
            <button class="btn btn-block">Create</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
