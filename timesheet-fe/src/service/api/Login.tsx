import { LoginDto } from "@/page/login/dto/create-user-dto";
import RequestApi from "../RequestApi";

export async function LoginApi(data: LoginDto) {
  try {
    const res = await RequestApi("auth/login", "POST", data);
    localStorage.setItem("accessToken", res.data.data.accessToken);
    localStorage.setItem("refreshToken", res.data.data.refreshToken);
    return res;
  } catch (error) {
    alert(error);
  }
}
