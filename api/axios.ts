import axios from "axios";

// Axios 인스턴스 생성
export const axiosBase = axios.create({
  baseURL: "https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});
