import { HttpClientCall } from "@/components/HTTPClient";
export async  function createNewSupportTicket(data) {
    return await HttpClientCall({
        endpoint: "ticket/store",
        method: "POST",
        includeAuth: true,
        data: data,
    })
        .then((response) => {
            return response.data;

        })
        .catch((error) => {
            return [];
        });
}

export async function getBetList() {
    return await HttpClientCall({
        endpoint: "ticket/bets",
        method: "GET",
        includeAuth: true,
        data: [],
    })
        .then((response) => {
        return response;
        })
        .catch((error) => {
        return [];
        });
    }