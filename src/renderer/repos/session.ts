// /courses/{courseId}/analysis-sessions
// 세션 생성하기
import axios, { AxiosResponse } from "axios";

interface ICreateSessionRequest {
  courseId: number;
}

interface ICreateSessionResponse {
  message: string;
  data: {
    courseId: number;
    id: number;
    status: "active" | "close";
    times: number; // 차시
  };
}

interface ICloseSessionRequest {
  courseId: number;
  analysisSessionId: number;
}

interface ICloseSessionResponseData {
  id: number; //세션 번호
  courseId: number;
  times: number; // 차시
  status: "close" | "active";
}

interface ICloseSessionResponse {
  message: string; // "분석세션을 성공적으로 마쳤습니다.",
  data: ICloseSessionResponseData;
}

const createSession = async ({
  courseId,
}: ICreateSessionRequest): Promise<AxiosResponse<ICreateSessionResponse>> => {
  return axios.post(`/courses/${courseId}/analysis-sessions`);
};

const closeSession = async ({
  courseId,
  analysisSessionId,
}: ICloseSessionRequest): Promise<AxiosResponse<ICloseSessionResponse>> => {
  return axios.post(
    `/courses/${courseId}/analysis-sessions/${analysisSessionId}/close`
  );
};

interface IAddDrowsnessesRequest {
  analysisSessionId: number;
  accountId: number;
  endSecond: number;
  startSecond: number;
}

// 이 타입은 확실하지 않음.
interface IAddDrownessesResponse {
  data: string;
}

// 졸음구간 추가하기
const addDrowsnesses = async ({
  analysisSessionId,
  accountId,
  endSecond,
  startSecond,
}: IAddDrowsnessesRequest): Promise<AxiosResponse<IAddDrownessesResponse>> => {
  return axios.post(
    `/analysis-sessions/${analysisSessionId}/accounts/${accountId}/drowsinesses`,
    {
      accountId,
      analysisSessionId,
      insertDTO: {
        accountId,
        analysisSessionId,
        endSecond,
        startSecond,
        status: "drowsiness",
      },
    }
  );
};

export {
  createSession,
  ICreateSessionResponse,
  closeSession,
  ICloseSessionResponse,
  ICloseSessionResponseData,
  addDrowsnesses,
  IAddDrownessesResponse,
  IAddDrowsnessesRequest,
};
