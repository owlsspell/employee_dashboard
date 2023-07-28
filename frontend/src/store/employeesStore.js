import { defineStore } from 'pinia'
import { getColumnAndCount } from './../api/fetchers';
import { ref } from 'vue';

export const useEmployeesStore = defineStore('employees', () => {
    const lineChartData = ref([])
    const xAxisChartData = ref([])
    // const name = ref('Eduardo')
    // const doubleCount = computed(() => count.value * 2)
    async function updateLineChartData() {
        // count.value++
        return getColumnAndCount("date").then(data => {
            lineChartData.value = data.timeArr
            return lineChartData
        })
    }

    return { lineChartData, updateLineChartData }
})


// state: () => ({ lineChartData: [], }),
//     getters: {
//         doubleCount: (state) => state.count * 2,
//     },
//     actions: {
//         updateLineChartData() {
//             // this.count++
//             getColumnAndCount("date").then(data => this.lineChartData = data
//       },
//     },