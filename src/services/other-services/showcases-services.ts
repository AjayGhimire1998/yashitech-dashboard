import { authHeader } from "../auth-services/auth-header";
import axios, { AxiosResponse } from "axios";

export const getShowcases = async (): Promise<AxiosResponse> => {
  const headers = authHeader();
  const res = await axios.get(
    process.env.REACT_APP_BASE_API_URL + "api/v1/showcases",
    {headers}
  );
  return res;
};

// export const updateHomePages = async (
//   payloadData: any,
//   dataId: number
// ): Promise<AxiosResponse> => {
//   const headers = authHeader();
//   const res = await axios.put(
//     process.env.REACT_APP_BASE_API_URL + `api/v1/home_yashi_pages/${dataId}`,
//     payloadData,
//     { headers }
//   );
//   return res;
// };
