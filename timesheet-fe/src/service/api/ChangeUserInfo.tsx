import { UserInfo } from "@/page/admin-user/dto/change-userInfo-dto";
import RequestApi from "../RequestApi";

export async function ChangeUserInfo(id: number, data: UserInfo) {
  try {
    const res = await RequestApi(`users/userinfo/${id}`, "PUT", data);
    if (res && res.status === 200) {
      return res;
    }
    throw new Error("Failed to change userÌno data");
  } catch (error) {
    alert(error);
  }
}
