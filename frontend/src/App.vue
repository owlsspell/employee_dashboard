<script setup>
import Header from "./components/Header/Header.vue";
import LayoutHeader from "./components/Header/LayoutHeader.vue";
import LayoutFooter from "./components/Footer/LayoutFooter.vue";
import router from "./router";
import { useAuthStore } from "./store/auth";
import { onMounted } from "vue";
import { useThemeStore } from "./store/theme";

console.log("MODE", import.meta.env.MODE);
const store = useAuthStore();

const { theme, toogleTheme } = useThemeStore();

onMounted(() => {
  store.getAuthToken();
});
</script>

<template>
  <Header :theme="theme" @click="(val) => toogleTheme(val)" />
  <LayoutHeader :title="router.currentRoute.value.name" />
  <div class="min-h-screen">
    <router-view />
  </div>
  <LayoutFooter />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap");
* {
  font-family: "Josefin Sans", sans-serif;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
