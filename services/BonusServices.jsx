import { HttpClientCall } from "@/components/HTTPClient";

export async function bonuslog(id) {
  return await HttpClientCall({
    endpoint: `bonus-log`,
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

export async function bonusClaimService(id) {
  return await HttpClientCall({
    endpoint: `bonus-claim`,
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

export async function bonusReferralClaimService(id) {
  return await HttpClientCall({
    endpoint: `referral-claim/${id}`,
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
