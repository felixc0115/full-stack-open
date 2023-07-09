import axios from "axios";

const baseURL = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (personObject) => {
  return axios.post(baseURL, personObject).then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((res) => res.data);
};

const update = (id, name, newNum) => {
  return axios
    .put(`${baseURL}/${id}`, { id, name, number: newNum })
    .then((res) => res.data);
};

export default { getAll, create, remove, update };
