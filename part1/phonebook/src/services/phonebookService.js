import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (personObject) => {
  return axios.post(baseURL, personObject).then((res) => res.data);
};

const remove = () => {};
export default { getAll, create };
