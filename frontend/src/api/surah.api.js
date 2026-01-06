import api from "./axios";

export const getSurahList = () =>
  api.get("/tafser/fetchSurahList");

export const getSurahById = (id) =>
  api.get(`/tafser/fetchSurah/${id}`);
