import api from "./index";

export const getMovies = async () => {
  try {
    const resp = await api.get("/list/1");
    return resp?.data?.results;
  } catch (err) {
    console.log(err);
  }
};
