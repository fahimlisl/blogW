import axiosInstance from "./axios.js";

export const getAnjumanList = () => axiosInstance.get("/general/anjuman/list");

export const increaseAnjumanView = (id) =>
  axiosInstance.patch(`/general/viewInAnjuman/${id}`);