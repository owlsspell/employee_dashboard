import { defineStore } from 'pinia'
import { ref } from 'vue';
import getToken from '../api/token';

export const useAuthStore = defineStore('auth', () => {
    const token = ref("")
    // const name = ref('Eduardo')
    // const doubleCount = computed(() => count.value * 2)
    async function getAuthToken() {
        // count.value++
        return getToken().then(data => {
            token.value = data
            return data
        })
    }

    return { token, getAuthToken }
})
