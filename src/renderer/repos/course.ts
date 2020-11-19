import axios, { AxiosResponse } from "axios";

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

const registerStudentCourse = async ({
  accountId,
  code,
}: IRequestRegisterStudentCourse): Promise<AxiosResponse> => {
  return axios.post(`/accounts/${accountId}/student/courses`, {
    code,
  });
};
interface IIsActive {
  id: number;
  courseId: number;
  times: number;
  status: string;
}
interface IResponseIsActive {
  message: string;
  data: IIsActive[];
}

const isActive = async (): Promise<AxiosResponse<IResponseIsActive>> => {
  return axios.get(`/courses/active`);
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
  isActive,
  IResponseIsActive,
  IIsActive,
};
