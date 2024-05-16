import { HttpClientCall } from "@/components/HTTPClient";

export async function userLogout() {
  return await HttpClientCall({
    endpoint: "logout",
    method: "POST",
    includeAuth: true,
    data: [],
  })
    .then(() => {
      localStorage.removeItem("userDetails");
      localStorage.removeItem("token");
    })
    .catch((error) => {
      // console.log(error);
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
      let data = res.data[0];
      localStorage.setItem("userDetails", JSON.stringify(data));
      // return data;
    }
  }).catch((error) => {
    // console.log(error);
  });
}

export async function oneClickRegister(){
  return await HttpClientCall({
    endpoint: "oneclick-signup",
    method: "POST",
    includeAuth: false,
    data: [],
  })
    .then((res) => {
      // console.log(res);
    })
    .catch((error) => {
      // console.log(error);
    });
}
