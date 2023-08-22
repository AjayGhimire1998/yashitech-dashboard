// import { authHeader } from "../auth-services/auth-header";
import axios, { Axios, AxiosResponse } from "axios";
import { authHeader } from "../auth-services/auth-header";

export const getShowcases = async (): Promise<AxiosResponse> => {
  const res = await axios.get(
    process.env.REACT_APP_BASE_API_URL + "api/v1/showcases"
  );
  return res;
};

export const viewShowcase = async (
  id: string | undefined
): Promise<AxiosResponse> => {
  const res = await axios.get(
    process.env.REACT_APP_BASE_API_URL + `api/v1/showcases/${id}`
  );
  return res;
};

export const createNewShowcase = async (
  payload: object
): Promise<AxiosResponse> => {
  const headers = authHeader();
  const res = axios.post(
    process.env.REACT_APP_BASE_API_URL + "api/v1/showcases",
    payload,
    { headers }
  );
  return res;
};

export const updateShowcase = async (
  payload: object,
  id: string | undefined
): Promise<AxiosResponse> => {
  const headers = authHeader();
  const res = axios.put(
    process.env.REACT_APP_BASE_API_URL + `api/v1/showcases/${id}`,
    payload,
    { headers }
  );
  return res;
};

export const deleteShowcase = async (
  id: string | undefined
): Promise<AxiosResponse> => {
  const headers = authHeader();
  const res = await axios.delete(
    process.env.REACT_APP_BASE_API_URL + `api/v1/showcases/${id}`,
    { headers }
  );
  return res;
};

// export const
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

export const checkIfEven = (value: number): boolean => {
  if (value % 2 === 0) {
    return true;
  }
  return false;
};

export const maxTenChars = (text: string): string => {
  if (text == null) {
    return "Null";
  }
  if (text.length < 13) {
    return text;
  }
  return text.slice(0, 13) + "...";
};

export const arrayOFAttributes = (attributes: object): string[] => {
  return Object.keys(attributes);
};

export const titleize = (text: string): string => {
  let result = "";
  result = text.charAt(0).toUpperCase() + text.slice(1);
  return result;
};
