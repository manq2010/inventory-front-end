import { configureStore } from '@reduxjs/toolkit';
// import { counterReducer as counter } from 'features/counter';
import { authReducer as auth } from '../features/auth/authSlice';
import { registrationReducer as registration } from '../features/registration/registrationSlice';
import { itemReducer as items } from '../features/items/itemsSlice';
import { saleReducer as sales } from '../features/sales/salesSlice';
// import { dogsReducer as dogs } from '../features/dogs/dogsSlice';

const store = configureStore({
  reducer: {
    // counter,
    auth,
    registration,
    items,
    sales,
    // dogs,
  },
});

export default store;
