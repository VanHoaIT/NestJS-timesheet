import axios from "axios";

export default function RequestApi(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: string | object | number,
  responseType: "json" | "blob" | "text" = "json"
) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const instance = axios.create({ headers });

  return instance.request({
    method: method,
    url: `${import.meta.env.VITE_API_URL}${endpoint}`,
    data: body,
    responseType: responseType,
  });
}
