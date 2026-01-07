import api from "./axios";

export const getKhutbaList = () =>
  api.get("/general/khutba/list");
