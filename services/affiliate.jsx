import { HttpClientCall } from "@/components/HTTPClient";

export async function createPromoCode(data) {
  return await HttpClientCall({
    endpoint: "affiliate/promotions",
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

export async function getWebsites(page, perPage, searchData) {
  return await HttpClientCall({
    endpoint: `affiliate/websites/${page}/${perPage}?search=${searchData}`,
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
export async function getWithdrawHistory(page, perPage, searchData) {
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

export async function getAffiliateGenerateLink(values) {
  return await HttpClientCall({
    endpoint: `affiliate/report/link/generate`,
    method: "POST",
    includeAuth: true,
    data: values,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}

export async function getAffiliateCreateFormData() {
  return await HttpClientCall({
    endpoint: `affiliate/report/common`,
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

export async function getAffiliateLink(filter = {}) {
  return await HttpClientCall({
    endpoint: `affiliate/report/links`,
    method: "GET",
    includeAuth: true,
    data: filter,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}
export async function getAffiliateDetails(values = {}) {
  return await HttpClientCall({
    endpoint: `affiliate/report/details`,
    method: "GET",
    includeAuth: true,
    data: values,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}

export async function getAffiliatePlayerReport(values = {}) {
  return await HttpClientCall({
    endpoint: `affiliate/report/player`,
    method: "GET",
    includeAuth: true,
    data: values,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}

export async function getAffiliateSummery(values = {}) {
  return await HttpClientCall({
    endpoint: `affiliate/report/summery`,
    method: "GET",
    includeAuth: true,
    data: values,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}
export async function getRegisterUser(page, perPage, search) {
  return await HttpClientCall({
    endpoint: `affiliate/promo_user/${page}/${perPage}?search=${search}`,
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

export async function createAffiliateApplication(data) {
  return await HttpClientCall({
    endpoint: "affiliate-application-submit",
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

export async function getApplyList(page, perPage) {
  return await HttpClientCall({
    endpoint: `affiliate-application-list/${page}/${perPage}`,
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

export async function getMyTickets(page) {
  return await HttpClientCall({
    endpoint: `all/${page}`,
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
