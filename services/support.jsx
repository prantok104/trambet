import { HttpClientCall } from "@/components/HTTPClient";
export async function createNewSupportTicket(data) {
  return await HttpClientCall({
    endpoint: "ticket/store",
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

export async function getBetList() {
  return await HttpClientCall({
    endpoint: "ticket/bets",
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

export async function replyTicket(data) {
  return await HttpClientCall({
    endpoint: `reply/store/${data?.id}`,
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


export async function closeTicket(id) {
  return await HttpClientCall({
    endpoint: `close/${id}`,
    method: "POST",
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
