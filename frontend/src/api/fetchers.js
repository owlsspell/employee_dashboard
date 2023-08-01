import axios from "axios";
import { base } from "../../config";

export const getAllEmployees = async (numberOfNotes, page) => await axios.get(base + "getEmployees", {
    params: {
        numberOfNotes, page
    }
}).then((response) => response.data);

export const getUniqueFields = async (column) => await axios.get(base + "getUniqueFields", {
    params: {
        column
    }
}).then((response) => {
    return response.data
});
export const getColumnAndCount = async (column) => await axios.get(base + "getColumnAndCount", {
    params: {
        column
    }
}).then((response) => {
    return response.data
});
export const editEmployeeData = async (employee) => await axios.post(base + "editEmployeeData", employee).then((response) => {
    return response.data
})

