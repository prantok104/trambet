import { HttpClientCall } from "@/components/HTTPClient";

export async function getPaymentMethods() {
  return await HttpClientCall({
    endpoint: "deposit/list",
    method: "GET",
    includeAuth: true,
    data: {},
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}

export async function getprovider(data) {
  return await HttpClientCall({
    endpoint: "deposit/getprovider",
    method: "GET",
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

export async function makeDeposit(payload) {
  return await HttpClientCall({
    endpoint: "deposit/deposit-store",
    method: "POST",
    includeAuth: true,
    data: payload,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}
