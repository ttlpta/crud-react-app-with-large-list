import axios from "../axios";
import { ITEM_PER_PAGE } from "../config";

export const addCar = async body => {
  try {
    const { data, status } = await axios.post("/cars", body);
    if (status !== 201) throw "Error";

    return !!data.id;
  } catch (error) {
    throw error;
  }
};

export const listCar = async (page = 1) => {
  try {
    const { data, status } = await axios.get(
      `/cars?_page=${page}&_limit=${ITEM_PER_PAGE}`
    );
    if (status !== 200) throw "Error";

    return data;
  } catch (error) {
    throw error;
  }
};
