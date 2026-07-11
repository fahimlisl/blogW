import axiosInstance from "./axios.js";

export const fetchAdminAnjumans = () =>
  axiosInstance.get("/admin/fetchAnjuman/list");

export const fetchAdminAnjuma = (id) =>
  axiosInstance.get(`/admin/fetchAnjuman/${id}`);

export const createAnjuman = (data) =>
  axiosInstance.post("/admin/addAnjuman", data);

export const updateAnjuman = (id, data) =>
  axiosInstance.patch(`/admin/editAnjuman/${id}`, data);

export const removeAnjuman = (id) =>
  axiosInstance.delete(`/admin/removeAnjuman/${id}`);