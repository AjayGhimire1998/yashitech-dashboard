import { authHeader } from "../auth-services/auth-header";
import axios from "axios";

export const getHomePages = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BASE_API_URL + "api/v1/home_yashi_pages",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return { error: "An error occured during loading data" };
  }
};

export const updateHomePages = async (payloadData, dataId) => {
  const headers = authHeader();
  try {
   axios.put(
      process.env.REACT_APP_BASE_API_URL + `api/v1/home_yashi_pages/${dataId}`,
      payloadData,
      { headers }
    ).then((res) => console.log(res))
    
    // return data;
  } catch (error) {
    console.log(error);
    return { error: "An error occured during updating data" };
  }
};
