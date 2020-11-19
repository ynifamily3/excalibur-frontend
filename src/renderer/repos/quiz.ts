import axios, { AxiosResponse } from "axios";

interface RGetQuizzes {
  message: string;
  data: IQuizElementC[];
}

const getQuizzes = async ({
  sessionId,
}: {
  sessionId: number;
}): Promise<AxiosResponse<RGetQuizzes>> => {
  return axios.get(`/analysis-sessions/${sessionId}/quizzes`);
};

interface IQuizElementC {
  id: number; // 퀴즈의 고유 ID
  analysisSessionId: number;
  content: string; // 문제
  example1: string;
  example2: string;
  example3: string;
  answer: number;
  isPick: number;
}

interface RCreateQuiz {
  message: string;
  data: IQuizElementC;
}

const createQuiz = async ({
  sessionId,
  answer,
  content,
  example1,
  example2,
  example3,
}: {
  sessionId: number;
  answer: number;
  content: string;
  example1: string;
  example2: string;
  example3: string;
}): Promise<AxiosResponse<RCreateQuiz>> => {
  return axios.post(`/analysis-sessions/${sessionId}/quizzes`, {
    analysisSessionId: sessionId,
    answer,
    content,
    example1,
    example2,
    example3,
  });
};

const pickQuiz = async ({
  analysisSessionId,
  quizId,
}: {
  analysisSessionId: number;
  quizId: number;
}): Promise<AxiosResponse<RCreateQuiz>> => {
  // 특정 퀴즈를 선택하여 출제한다.
  return axios.post(
    `/analysis-sessions/${analysisSessionId}/quizzes/${quizId}/pick`
  );
};

export { getQuizzes, RGetQuizzes, createQuiz, IQuizElementC, pickQuiz };
