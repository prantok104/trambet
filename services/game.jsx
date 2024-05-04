
import { HttpClientCall } from "@/components/HTTPClient";
export async function getCategory(type) {
  return await HttpClientCall({
    endpoint: `sport/category/${type}`,
    method: "GET",
    includeAuth: false,
    data: [],
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
}