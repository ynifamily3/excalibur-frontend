import Axios from "axios";

const defaultHeaders = {
  accept: "*/*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "exc-front": process.env.HOME,
};

const setAccessToken = (accessToken: string): void => {
  Axios.defaults.headers = {
    ...Axios.defaults.headers,
    Authorization: accessToken,
  };
};

const applyAxiosSettings = (): void => {
  Axios.defaults.baseURL = process.env.REACT_APP_EXC_ENDPOINT_DEV as string;
  Axios.defaults.headers = defaultHeaders;
};

export { defaultHeaders, applyAxiosSettings, setAccessToken };
