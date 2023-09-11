import axios from "axios";
import { base } from "../../config";
import { useAuth0 } from "@auth0/auth0-vue";
import { useAuthStore } from "../store/auth";

export const getAllEmployees = async (numberOfNotes, page) => {
    // const { getAccessTokenSilently } = useAuth0();

    const { token, getAuthToken } = useAuthStore()
    // if (!token) getAuthToken()
    // const token = await getAccessTokenSilently();

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
    console.log(token);

    return await axios.post(base + "employees/edit_employee_data", employee, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((response) => {
        return response.data
    })
}

