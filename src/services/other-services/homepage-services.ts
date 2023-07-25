import { authHeader } from "../auth-services/auth-header";
import axios, { AxiosResponse } from "axios";
// import { HomePageUpdateResponse } from "../../components/pages/home-page/HomePage";

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

export const updateHomePages = async (
  payloadData: any,
  dataId: number
): Promise<AxiosResponse> => {
  const headers = authHeader();
  const res = await axios.put(
    process.env.REACT_APP_BASE_API_URL + `api/v1/home_yashi_pages/${dataId}`,
    payloadData,
    { headers }
  );
  return res;
};
