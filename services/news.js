import { HttpClientCall } from "@/components/HTTPClient";

export async function getAllNews(props) {
    await HttpClientCall({
      endpoint: "frontend/blog",
      method: "GET",
      includeAuth: false,
      data: [],
    })
      .then((response) => {console.log('ki');
        if (response?.data) {
          console.log(response.data[0]);
          return response.data[0];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };