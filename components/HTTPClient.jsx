import axios from 'axios';

export async function fetchData(endpoint) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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