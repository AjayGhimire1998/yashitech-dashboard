import { authHeader } from "../auth-services/auth-header";
import axios, { AxiosResponse } from "axios";
const headers = authHeader();
export const getContactsData = async (): Promise<AxiosResponse> => {
  const res = await axios.get(
    process.env.REACT_APP_BASE_API_URL + "api/v1/contacts",
    {
      headers,
    }
  );

  return res;
};

export const showContactData = async (
  id: string | undefined
): Promise<AxiosResponse> => {
  const res = await axios.get(
    process.env.REACT_APP_BASE_API_URL + `api/v1/contacts/${id}`,
    { headers }
  );
  return res;
};

export const deleteContact = async (
  id: string | undefined
): Promise<AxiosResponse> => {
  const res = await axios.delete(
    process.env.REACT_APP_BASE_API_URL + `api/v1/contacts/${id}`,
    { headers }
  );

  return res;
};

export const getServices = async () => {
  const res = await axios.get(
    process.env.REACT_APP_BASE_API_URL + "api/v1/services"
  );
  return res;
};
