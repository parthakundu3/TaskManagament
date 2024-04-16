'use client';
import http from "./common-httpd";

const getAll = () => {
  return http.get("/tutorials");
};

const get = (id: number) => {
  return http.get(`/tutorials/${id}`);
};

const create = (data:{}) => {
  return http.post("/register", data);
};
const login = (data:{}) => {
  return http.post("/login", data);
};

const update = (id: number, data:{}) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = (id:number) => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = (title:string) => {
  return http.get(`/tutorials?title=${title}`);
};

const apiService = {
  getAll,
  get,
  create,
  login,
  update,
  remove,
  removeAll,
  findByTitle
};

export default apiService;