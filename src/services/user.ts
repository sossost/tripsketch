import axios from "axios";
import mockData from "../../data/mockdata.json";

export const getCurrentUser = async () => {
  try {
    const reponse = await axios("data/mockdata.json");
    return reponse.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getFollowerList = async (userId: string, searchQuery: string) => {
  try {
    return Promise.resolve(mockData.users);
  } catch (error: any) {
    console.log(error);
  }
};

export const getFollowingList = async (userId: string, searchQuery: string) => {
  try {
    return Promise.resolve(mockData.users);
  } catch (error: any) {
    console.log(error);
  }
};
