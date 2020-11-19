import axios, { AxiosResponse } from "axios";
// TODO 강의 조회, 생성, 구현하기
// const course = async () => {};

interface IRequestGetTeacherCourses {
  accountId: number;
}

type IRequestGetStudentCourses = IRequestGetTeacherCourses;

interface IResponseGetTeacherCourses {
  message: string;
  data: {
    name: string;
    accountId: number;
    code: string;
  }[];
}

type IResponseGetStudentCourses = IResponseGetTeacherCourses;

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

const getStudentCourses = async ({
  accountId,
}: IRequestGetStudentCourses): Promise<
  AxiosResponse<IResponseGetStudentCourses>
> => {
  return axios.get(`/accounts/${accountId}/student/courses`);
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

interface IRequestRegisterStudentCourse {
  accountId: number;
  code: string;
}
interface IResponseRegisterStudentCourse {}

const registerStudentCourse = async ({
  accountId,
  code,
}: IRequestRegisterStudentCourse): Promise<
  AxiosResponse<IResponseRegisterStudentCourse>
> => {
  return axios.post(`/accounts/${accountId}/student/courses`, {
    code,
  });
};

export {
  getTeacherCourses,
  createTeacherCourses,
  IRequestGetTeacherCourses,
  IResponseGetTeacherCourses,
  IRequestCreateTeacherCourses,
  IResponseCreateTeacherCourses,
  getStudentCourses,
  IRequestGetStudentCourses,
  IResponseGetStudentCourses,
  registerStudentCourse,
  IRequestRegisterStudentCourse,
  IResponseRegisterStudentCourse,
};
