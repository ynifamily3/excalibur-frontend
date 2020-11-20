import axios, { AxiosResponse } from "axios";
import { defaultHeaders } from "repos";

interface IDrowsiness {
  status: string;
  start: number;
  end: number; // 단위: 초
}

const uploadStudentVideo = async (
  file: File
): Promise<AxiosResponse<IDrowsiness[]>> => {
  const data = new FormData();
  data.append("file", file);
  return axios({
    baseURL: "http://52.78.13.49:8000",
    url: "/drowsiness_from_file",
    method: "POST",
    headers: {
      ...defaultHeaders,
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};

export { uploadStudentVideo };
