import axios from 'axios';

export const httpItems = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000/',
});

const getItems = async (url) => {
  // const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'GET',
    headers: {
    //   Authorization: `Bearer ${token}`,
    },
  };
  const res = await httpItems.get(url, requestOptions);

  return {
    results: res,
  };
};

const getItem = async (url) => {
  // const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'GET',
    headers: {
    //   Authorization: `Bearer ${token}`,
    },
  };
  const res = await httpItems.get(url, requestOptions);

  return {
    results: res,
  };
};

const addItem = async (url, item) => {
  // const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'POST',
    headers: {
    //   Authorization: `Bearer ${token}`,
    },
  };
  const res = await httpItems.post(url, item, requestOptions);

  return {
    results: res,
  };
};

// Delete an item
const deleteItem = async (url, id) => {
  // const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'DELETE',
    headers: {
    //   Authorization: `Bearer ${token}`,
    },
  };
  await httpItems.delete(url, requestOptions);

  return {
    results: id,
  };
};
export const itemsApi = {
  getItems,
  getItem,
  addItem,
  deleteItem,
};
