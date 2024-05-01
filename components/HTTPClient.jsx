import axios from 'axios';
import ConstantData from './ConstantData';

export async function HttpClientCall(props) {
    const baseUrl = ConstantData.API_BASE_URL;
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
    };
    if (props.includeAuth == true) {
        headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    try {
        if(props.method == "GET") {
            const res = await axios.get(`${baseUrl}/${props.endpoint}`, {
                headers: headers,
                params: props.data,
            });
            return res.data;
        } else if (props.method == "POST") {
            const res = await axios.post(`${baseUrl}/${props.endpoint}`, props.data, {
                headers: headers,
            });
            return res.data;
        } else if (props.method == "PUT") {
            const res = await axios.put(`${baseUrl}/${props.endpoint}`, props.data, {
                headers: headers,
            });
            return res.data;
        } else if (props.method == "DELETE") {
            const res = await axios.delete(`${baseUrl}/${props.endpoint}`, {
                headers: headers,
            });
            return res.data;
        }
    } catch (error) {
        return error;
    }
}