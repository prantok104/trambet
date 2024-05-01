import { HttpClientCall } from "@/components/HTTPClient";

export async function getAllPromotions() {
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
  
  export async function createPromoCode(data) {
    return await HttpClientCall({
      endpoint: "affiliate/promo/create",
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

  export async function getRegisterUser(page, perPage) {
    return await HttpClientCall({
      endpoint: `affiliate/promo_user/${page}/${perPage}`,
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