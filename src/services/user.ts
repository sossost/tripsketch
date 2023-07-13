import axios from "axios";

export const getCurrentUser = async () => {
  try {
    const reponse = await axios("data/mockdata.json");
    return reponse.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getFollowerList = async (userId: string) => {
  try {
    const response = await require("/data/mockdata.json");
    return response.users;
  } catch (error: any) {
    console.log(error);
  }
};

export const getFollowingList = async (userId: string) => {
  try {
    const response = await require("/data/mockdata.json");
    return response.users;
  } catch (error: any) {
    console.log(error);
  }
};
