import api from "./axios";

// Fetch list of Tafser Ahsanul Kawul (public)
export const getTafserAhsanulKawulList = async () => {
  const response = await api.get("/general/tafserAhsanulKawul/list");
  return response;
};

// Increment view count
export const increaseTafserAhsanulKawulView = async (id) => {
  const response = await api.patch(`/general/viewIntafserAhsanulKawul/${id}`);
  return response;
};

// Admin APIs
export const fetchAdminTafserAhsanulKawulList = async () => {
  const response = await api.get("/admin/fetchtafserAhsanulKawul/list");
  return response;
};

export const fetchAdminTafserAhsanulKawul = async (id) => {
  const response = await api.get(`/admin/fetchtafserAhsanulKawul/${id}`);
  return response;
};

export const createTafserAhsanulKawul = async (data) => {
  const response = await api.post("/admin/addtafserAhsanulKawul", data);
  return response;
};

export const updateTafserAhsanulKawul = async (id, data) => {
  const response = await api.patch(`/admin/edittafserAhsanulKawul/${id}`, data);
  return response;
};

export const deleteTafserAhsanulKawul = async (id) => {
  const response = await api.delete(`/admin/removetafserAhsanulKawul/${id}`);
  return response;
};