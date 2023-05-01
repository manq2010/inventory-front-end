export const IUser = {
  first_name: '',
  last_name: '',
};

export const ILoginResponse = {
  email: '',
  given_name: '',
  family_name: '',
  signInUserSession: {
    accessToken: { jwtToken: '' },
    idToken: { jwtToken: '' },
    refreshToken: { token: '' },
  },
};

export const ILoginCredentials = {
  email: '',
  password: '',
};
