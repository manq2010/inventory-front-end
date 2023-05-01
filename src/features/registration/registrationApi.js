// features
// import ILoginCredentials from './authTypes';

export const login = async ({ email, password }) => {
  console.log('password', password, email);
  return { first_name: 'John', last_name: 'Doe' };
};

export const registrationApi = {
  login,
};
