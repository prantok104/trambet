import { HttpClientCall } from "@/components/HTTPClient";

export async function getPaymentMethods() {
    return await HttpClientCall({
        endpoint: "deposit/list",
        method: "GET",
        includeAuth: true,
        data: {},
    }).then((response) => {
            return response;
        })
        .catch((error) => {
            return [];
        });
}