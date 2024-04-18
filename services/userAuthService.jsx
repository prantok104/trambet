import { HttpClientCall } from "@/components/HTTPClient";

export async function userLogout() {
  return await HttpClientCall({
    endpoint: "logout",
    method: "POST",
    includeAuth: true,
    data: [],
  })
    .then(() => {
      localStorage.removeItem("token");
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getUserDetailsData() {
  return await HttpClientCall({
    endpoint: "my-profile",
    method: "GET",
    includeAuth: true,
    data: [],
  }).then((res) => {
    if (res?.data) {
        return res.data[0];
      }
    })
    .catch((error) => {
      return error;
    });
}
