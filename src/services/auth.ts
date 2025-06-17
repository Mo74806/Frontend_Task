import axios from "axios";

export const authService = { login };

async function login(loginData: {
  email: string;
  password: string;
}): Promise<any> {
  try {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_BASE_URL}/users?email=${
        loginData.email
      }&password=${loginData.password}`,
    };

    let response = await axios(config);

    return response;
  } catch (e) {
    return e;
  }
}
