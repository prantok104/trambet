import { HttpClientCall } from "@/components/HTTPClient";

export async  function getLiveCasinoData() {
    return await HttpClientCall({
      endpoint: "casino/live",
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
export async  function getLiveCasinoOpenData(data) {
    return await HttpClientCall({
        endpoint: "casino/game/open",
        method: "GET",
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

export async function getCasinoHistory(page, perpageData) {
    return await HttpClientCall({
        endpoint: `casino/history/${page}/${perpageData}`,
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

export async function getCasinoSession(session) {
    return await HttpClientCall({
      endpoint: `casino/session/${session}`,
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