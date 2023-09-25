import axiosBase from "@services/axios";

export const getRequest = async (
  url: string,
  headers?: Record<string, string>
) => {
  try {
    const response = await axiosBase.get(url, { headers: headers || {} });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: unknown) {
    throw error;
  }
};
