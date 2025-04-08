import { useRef } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	Provider,
} from 'react-redux';
import globalReducer from '../state';
import { api } from '../state/api';
import { setupListeners } from '@reduxjs/toolkit/query';
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
import { PersistGate } from 'redux-persist/integration/react';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

/* Redux Persist - Handles state persistence */
const createNoopStorage = () => {
	return {
		getItem(_key: any) {
			return Promise.resolve(null);
		},
		setItem(_key: any, value: any) {
			return Promise.resolve(value);
		},
		removeItem(_key: any) {
			return Promise.resolve();
		},
	};
};

// Use in-memory storage when window is not available (e.g., SSR)
const storage =
	typeof window === 'undefined'
		? createNoopStorage()
		: createWebStorage('local');

// Persist configuration for Redux Persist
const persistConfig = {
	key: 'root', // Root key for persisted storage
	storage, // Storage engine (localStorage in browser)
	whitelist: ['global'], // Only persist the 'global' state
};

// Combine reducers for the store
const rootReducer = combineReducers({
	global: globalReducer, // Main global state reducer
	[api.reducerPath]: api.reducer, // API slice reducer from RTK Query
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Redux Store Configuration */
export const makeStore = () => {
	return configureStore({
		reducer: persistedReducer, // Use the persisted reducer
		middleware: (getDefault) =>
			getDefault({
				serializableCheck: {
					// Ignore Redux Persist actions to avoid serialization warnings
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(api.middleware), // Add RTK Query middleware
	});
};

/* Type Definitions for Redux */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* Redux Provider Component */
export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>();

	// Initialize store only once
	if (!storeRef.current) {
		storeRef.current = makeStore();
		setupListeners(storeRef.current.dispatch); // Enable automatic refetching in RTK Query
	}

	// Create a persistor for Redux Persist
	const persistor = persistStore(storeRef.current);

	return (
		<Provider store={storeRef.current}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
