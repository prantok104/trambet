import { HttpClientCall } from "@/components/HTTPClient";


export async  function getAllNews() {
    await HttpClientCall({
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