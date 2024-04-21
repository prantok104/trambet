import { HttpClientCall } from "@/components/HTTPClient";


export async  function getAllNews() {
    return await HttpClientCall({
      endpoint: "news/1",
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

export async  function getNewsDetails(id) {
    return await HttpClientCall({
        endpoint: `news-details/${id}`,
        method: "GET",
        includeAuth: false,
        data: [],
    })
        .then((response) => {
            return response;

        })
        .catch((error) => {
            return [];
        });
}