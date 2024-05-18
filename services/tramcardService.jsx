import { HttpClientCall } from "@/components/HTTPClient";

export async function tramcards(id) {
  return await HttpClientCall({
    endpoint: `tram-card`,
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

export async function tramcardClaimService(id) {
  return await HttpClientCall({
    endpoint: `tram-card-claim`,
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
