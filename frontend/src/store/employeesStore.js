import { defineStore } from 'pinia'
import { getColumnAndCount, getUniqueFields } from './../api/charts';
import { ref } from 'vue';

export const useEmployeesStore = defineStore('employees', () => {
    const lineChartData = ref([])
    const chartCountryAndValues = ref([])
    const maxCountryValue = ref(0)

    async function updateLineChartData(data) {
        lineChartData.value = data.timeArr
        return lineChartData
    }
    async function updateChartCountryAndValues(data) {
        chartCountryAndValues.value = data
        return chartCountryAndValues
    }
    async function updateMaxCountryValue(count) {
        maxCountryValue.value = count
        return maxCountryValue
    }

    return { lineChartData, updateLineChartData, chartCountryAndValues, updateChartCountryAndValues, maxCountryValue, updateMaxCountryValue }
})
