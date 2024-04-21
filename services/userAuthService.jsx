import { HttpClientCall } from "@/components/HTTPClient";

export async function userLogout() {
  return await HttpClientCall({
    endpoint: "logout",
    method: "POST",
    includeAuth: true,
    data: [],
  })
    .then(() => {
      localStorage.removeItem("user");
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
      localStorage.setItem('user', JSON.stringify(res.data[0]));
    }
  }).catch((error) => {
    localStorage.setItem('user', []);
  });
}

export async function oneClickRegister(){
  return await HttpClientCall({
    endpoint: "one-click-register",
    method: "POST",
    includeAuth: false,
    data: [],
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}
