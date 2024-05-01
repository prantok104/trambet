import { HttpClientCall } from "@/components/HTTPClient";

export async  function getAllPromotions() {
    return await HttpClientCall({
      endpoint: "affiliate/promotions",
      method: "GET",
      includeAuth: true,
      data: [],
    })
      .then((response) => {
         return response.data;

      })
      .catch((error) => {
        return [];
      });
  }
export async function getWebsites(page, perPage,searchData) {
    return await HttpClientCall({
        endpoint: `affiliate/websites/${page}/${perPage}`,
        method: "GET",
        includeAuth: true,
        data: searchData,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return [];
        });
}
export async function getWithdrawHistory(page, perPage,searchData) {
    return await HttpClientCall({
        endpoint: `withdraw/history/${page}/${perPage}`,
        method: "GET",
        includeAuth: true,
        data: searchData,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return [];
        });
}