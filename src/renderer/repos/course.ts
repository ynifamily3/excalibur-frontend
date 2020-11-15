import axios, { AxiosResponse } from "axios";
// TODO 강의 조회, 생성, 구현하기
// const course = async () => {};

interface IRequestGetTeacherCourses {
  accountId: number;
}

interface IResponseGetTeacherCourses {
  message: string;
  data: {
    name: string;
    accountId: number;
    code: string;
  }[];
}

interface IRequestCreateTeacherCourses extends IRequestGetTeacherCourses {
  name: string;
}

interface IResponseCreateTeacherCourses
  extends Pick<IResponseGetTeacherCourses, "data"> {
  message: string;
}

const getTeacherCourses = async ({
  accountId,
}: IRequestGetTeacherCourses): Promise<
  AxiosResponse<IResponseGetTeacherCourses>
> => {
  return axios.get(`/accounts/${accountId}/teacher/courses`);
};

const createTeacherCourses = async ({
  accountId,
  name,
}: IRequestCreateTeacherCourses): Promise<
  AxiosResponse<IResponseCreateTeacherCourses>
> => {
  return axios.post(`/courses`, {
    accountId,
    name,
  });
};

export {
  getTeacherCourses,
  createTeacherCourses,
  IRequestGetTeacherCourses,
  IResponseGetTeacherCourses,
  IRequestCreateTeacherCourses,
  IResponseCreateTeacherCourses,
};
