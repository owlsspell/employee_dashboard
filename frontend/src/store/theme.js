import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme'));
    function toogleTheme(string) {
        return theme.value = string
    }

    return { theme, toogleTheme }
})
