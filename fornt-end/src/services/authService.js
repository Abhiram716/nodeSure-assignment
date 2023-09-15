import apiClient from "./apiService";

class AuthServcie {
  async signin(username, password) {
    try {
      const response = await apiClient.post("/api/access-tokens", {
        username,
        password,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default AuthServcie;
