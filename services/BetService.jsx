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

export async function betsHisotry(page, per_page) {
  return await HttpClientCall({
    endpoint: `bet-history/${page}/${per_page}`,
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
