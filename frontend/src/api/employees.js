import axios from "axios";
import { base } from "../../config";
import { useAuthStore } from "../store/auth";

export const getAllEmployees = async (numberOfNotes, page) => {

    const { token } = useAuthStore()

    return await axios.get(base + "employees/get_employees",
        {

            params: {
                numberOfNotes, page
            },

            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => response.data)
}
export const getCountries = async () => {
    return await axios.get("https://restcountries.com/v3.1/all?fields=name",
        {
            params: {
                fields: "name"
            },
        }).then((response) => response.data.map(item => item.name.common))

}

export const createEmployee = async (newEmployee) => {
    const { token } = useAuthStore()

    return await axios.post(base + "employees/create_employee", newEmployee, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((response) => {
        return response.data;
    });
}

export const editEmployeeData = async (employee) => {
    const { token } = useAuthStore()

    return await axios.post(base + "employees/edit_employee_data", employee, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((response) => {
        return response.data
    })
}

