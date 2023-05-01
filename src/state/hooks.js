import { useDispatch, useSelector } from 'react-redux';
import store from './store';

// Infer the `RootState` and `AppDispatch` types from the store itself
export const RootState = store.getState();
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const AppDispatch = store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
