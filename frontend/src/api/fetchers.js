import axios from "axios";
import { base } from "../../config";

export const getAllEmployees = async () => await axios.get(base + "getEmployees").then((response) => response.data);

export const getUniqueFields = async (column) => await axios.get(base + "getUniqueFields", {
    params: {
        column
    }
}).then((response) => {
    return response.data
});

