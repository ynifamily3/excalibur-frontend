import axios from "axios";
import { Userinfo } from "types/userinfo";

export default {
  getList: async function (
    page: number
  ): Promise<{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    ad: unknown;
    data: Userinfo[];
  }> {
    try {
      let url;
      if (page != null && page > 1) {
        url = "https://reqres.in/api/users?per_page=2&page=" + page;
      } else {
        url = "https://reqres.in/api/users?per_page=2";
      }
      const response = await axios.get<{
        page: number;
        per_page: number;
        total: number;
        total_pages: number;
        ad: unknown;
        data: Userinfo[];
      }>(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
