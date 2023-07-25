export const login = async (email, password) => {
  try {
    const response = await fetch(process.env.REACT_APP_BASE_API_URL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data?.accessToken) {
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(data.user.data));
      localStorage.setItem("id", data.user.data.id);
      localStorage.setItem("tk", JSON.stringify(data.accessToken));
      // window.location.reload();
    }

    // console.log(data);
    return data; 
  } catch (error) {
    // console.log("error", error);
    return { error: "An error occurred during login" }; 
  }
};

export const logOut = () => {
  localStorage.clear();
  window.location.reload();
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("tk");
  if (token) {
    return JSON.parse(token);
  }
  return null;
};
export const getUserDetails = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
