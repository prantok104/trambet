import { HttpClientCall } from "@/components/HTTPClient";


export async  function getPrivacyPolicy() {
    return await HttpClientCall({
        endpoint: "get-privacy-policy",
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

export async  function getTermsOfService() {
    return await HttpClientCall({
        endpoint: "terms-of-service",
        method: "GET",
        includeAuth: false,
        data: [],
    }).then((response) => {
            return response.data;

        })
        .catch((error) => {
            return [];
        });
}
export async  function getRefundPolicy() {
    return await HttpClientCall({
        endpoint: "refund-policy",
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

export async function getCountryList() {
    return await HttpClientCall({
        endpoint: "country",
        method: "GET",
        includeAuth: false,
        data: [],
    }).then((response) => {
            return response.data;

        }).catch((error) => {
            return [];
        });
}

export async function getCurrencyList() {
    return await HttpClientCall({
        endpoint: "currency",
        method: "GET",
        includeAuth: false,
        data: [],
    }).then((response) => {
            return response.data;

        }).catch((error) => {
            return [];
        });
}

export async function getDepositBonus() {
  return await HttpClientCall({
    endpoint: "deposit-bonus",
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