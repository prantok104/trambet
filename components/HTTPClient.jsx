import axios from 'axios';
import ConstantData from './ConstantData';

export async function fetchData(endpoint) {
    const baseUrl = ConstantData.API_BASE_URL;
    try {
        const res = await axios.get(`${baseUrl}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return res.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}