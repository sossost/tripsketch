import axiosBase from "./axios";

export const getCategoriesByNickname = async (nickname: string) => {
  try {
    const response = await axiosBase.get(
      `trip/nickname/trips/country-frequencies?nickname=${nickname}`
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response.data.message);
  }
};
