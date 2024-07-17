import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './users/Services';
import { jobPostsApi } from './jobPosts/Services';
import {uploadResumeApi} from "./uploadResume/Services";
import Reducer from './userReducer'
import { assessmentsApi } from './assesments/Services';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import applicationsReducer from './applications/applicationsReducer';
import { applicationsApi } from './applications/applicationsAPI';

const persistConfig = {
  key: 'root',
  storage,
}

const userReducer = persistReducer(persistConfig, Reducer)

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    [applicationsApi.reducerPath]: applicationsApi.reducer,

    [usersApi.reducerPath]: usersApi.reducer,
    [assessmentsApi.reducerPath] : assessmentsApi.reducer,
    [jobPostsApi.reducerPath]: jobPostsApi.reducer,
    [uploadResumeApi.reducerPath]: uploadResumeApi.reducer,

    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      usersApi.middleware,
      uploadResumeApi.middleware,
      jobPostsApi.middleware,
      assessmentsApi.middleware,
      applicationsApi.middleware
    ),
})
export const persistor = persistStore(store)

setupListeners(store.dispatch)
