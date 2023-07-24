import { getCurrentUser } from "./auth-service";

export const authHeader = () => {
  const userToken = getCurrentUser();
  if (userToken) {
    return { Authorization: "Bearer " + userToken };
  } else {
    return {};
  }
};
