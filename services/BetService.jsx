import { HttpClientCall } from "@/components/HTTPClient";

export async function betPlacement(data) {
  return await HttpClientCall({
    endpoint: `bet-store`,
    method: "POST",
    includeAuth: true,
    data: data,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}
