import * as SecureStore from "expo-secure-store";

export const setDataToSecureStore = async (key: string, data: string) => {
  try {
    const jsonData = JSON.stringify(data);
    await SecureStore.setItemAsync(key, jsonData);
  } catch (error) {
    console.error(`Error storing data with key ${key}: ${error}`);
  }
};

export const getDataFromSecureStore = async (key: string) => {
  try {
    const jsonData = await SecureStore.getItemAsync(key);
    return jsonData && JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error retrieving data with key ${key}: ${error}`);
  }
};
