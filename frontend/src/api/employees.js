import axios from "axios";
import { base } from "../../config";

export const getAllEmployees = async (numberOfNotes, page) => await axios.get(base + "employees/get_employees", {
    params: {
        numberOfNotes, page
    }
}).then((response) => response.data);

export const createEmployee = async (newEmployee) => {
    await axios.post(base + "employees/create_employee", newEmployee).then((response) => {
        return response.data;
    });
}

export const editEmployeeData = async (employee) => await axios.post(base + "employees/edit_employee_data", employee).then((response) => {
    return response.data
})

