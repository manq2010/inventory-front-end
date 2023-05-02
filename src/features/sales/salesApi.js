import axios from 'axios';

export const httpSales = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000/',
});

const getSales = async (url) => {
  // const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'GET',
    headers: {
    //   Authorization: `Bearer ${token}`,
    },
  };
  const res = await httpSales.get(url, requestOptions);

  return {
    results: res,
  };
};

const getSale = async (url) => {
  // const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'GET',
    headers: {
    //   Authorization: `Bearer ${token}`,
    },
  };
  const res = await httpSales.get(url, requestOptions);

  return {
    results: res,
  };
};

const addSale = async (url, item) => {
  // const token = localStorage.getItem('token');
  console.log('addItem', item);
  const requestOptions = {
    method: 'POST',
    headers: {
    //   Authorization: `Bearer ${token}`,
    },
  };
  const res = await httpSales.post(url, item, requestOptions);

  return {
    results: res,
  };
};

// Delete a Sale
const deleteSale = async (url, id) => {
  // const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'DELETE',
    headers: {
    //   Authorization: `Bearer ${token}`,
    },
  };
  await httpSales.delete(url, requestOptions);

  return {
    results: id,
  };
};
export const itemsApi = {
  getSales,
  getSale,
  addSale,
  deleteSale,
};
