import { HttpClientCall } from "@/components/HTTPClient";

export async function getNotifications() {
  return await HttpClientCall({
    endpoint: `notifications-all`,
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

export async function notificationRead(id) {
  return await HttpClientCall({
    endpoint: `notifications-update`,
    method: "POST",
    includeAuth: true,
    data: {
      notification_id: id,
      is_read: 1,
    }
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}
