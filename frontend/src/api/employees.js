import axios from "axios";
import { base } from "../../config";
import { useAuth0 } from "@auth0/auth0-vue";

export const getAllEmployees = async (numberOfNotes, page) => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    if (!isAuthenticated) return;

    const token = await getAccessTokenSilently();

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
    await axios.post(base + "employees/create_employee", newEmployee).then((response) => {
        return response.data;
    });
}

export const editEmployeeData = async (employee) => await axios.post(base + "employees/edit_employee_data", employee).then((response) => {
    return response.data
})

