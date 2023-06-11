import axios from "../axios";
import { House } from "../types";

export const createHouse = async (newHouse: House) => {
  try {
    const { data } = await axios.post("/api/houses", newHouse);
    return data;
  } catch (error) {
    return error;
  }
};
export const getHouse = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/houses/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const updateHouse = async (updatedHouse: House) => {
    console.log('updatedHouse:',updatedHouse);
    
  try {
    const { data } = await axios.put(`/api/houses/${updatedHouse.id}`, {
      address: updatedHouse.address,
      currentValue: updatedHouse.currentValue,
      loanAmount: updatedHouse.loanAmount,
    });
    return data;
  } catch (error) {
    return error;
  }
};
