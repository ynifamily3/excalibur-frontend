import axios, { AxiosResponse } from "axios";
import { defaultHeaders } from "repos";

export interface IRequestSignUp extends IRequestSignIn {
  name: string;
  role: "student" | "teacher";
  type?: "normal" | "google";
}

interface IResponseSignUp {
  data: string;
  message: string;
}

interface IRequestSignIn {
  email: string;
  password: string;
}

interface IResponseSignIn {
  message: string;
  data: Omit<IRequestSignUp, "password"> & {
    id: number;
    accessToken: string;
    refreshToken: string;
  };
}

const signIn = async ({
  email,
  password,
}: IRequestSignIn): Promise<AxiosResponse<IResponseSignIn>> => {
  return axios.post(
    `/accounts/signin`,
    {
      email,
      password,
    },
    { headers: defaultHeaders }
  );
};

const signUp = async ({
  email,
  name,
  password,
  role,
  type = "normal",
}: IRequestSignUp): Promise<AxiosResponse<IResponseSignUp>> => {
  return axios.post(
    `/accounts/signup`,
    {
      email,
      name,
      password,
      role,
      type,
    },
    { headers: defaultHeaders }
  );
};

export { signUp, signIn };
