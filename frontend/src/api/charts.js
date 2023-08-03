import axios from "axios";
import { base } from "../../config";

export const getUniqueFields = async (column) => await axios.get(base + "charts/get_unique_fields", {
    params: {
        column
    }
}).then((response) => {
    return response.data
});

export const getColumnAndCount = async (column) => await axios.get(base + "charts/get_column_and_count", {
    params: {
        column
    }
}).then((response) => {
    return response.data
});