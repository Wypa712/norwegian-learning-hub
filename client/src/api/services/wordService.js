import api from "../axios";

export const getWord = async () => {
  const res = await api.get("/api/word");
  return res.data;
};


export const addWord = async (data) => {
  const res = await api.post("/api/word", data)
  return res.data
}