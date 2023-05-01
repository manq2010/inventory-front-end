import { configureStore } from '@reduxjs/toolkit';
// import { counterReducer as counter } from 'features/counter';
import { authReducer as auth } from '../features/auth/authSlice';
import { registrationReducer as registration } from '../features/registration/registrationSlice';

// import { dogsReducer as dogs } from '../features/dogs/dogsSlice';

const store = configureStore({
  reducer: {
    // counter,
    auth,
    registration,
    // dogs,
  },
});

export default store;
