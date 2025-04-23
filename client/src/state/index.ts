import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import { api } from './api/api';

export const rootReducer = combineReducers({
	global: globalReducer,
	[api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
