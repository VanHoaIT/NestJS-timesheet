import RequestApi from "../RequestApi";

export async function GetUser(email: string) {
  try {
    const res = await RequestApi(`users/${email}`, "GET");
    if (res && res.status === 200) {
      return res;
    }
    throw new Error("Failed to fetch user data");
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
