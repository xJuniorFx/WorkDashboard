import { useRef } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	Provider,
} from 'react-redux';
import globalReducer from '../state'; // Importing the global state reducer
import { api } from '../state/api'; // Importing the RTK Query API slice
import { setupListeners } from '@reduxjs/toolkit/query'; // For enabling automatic refetching in RTK Query
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'; // Redux Persist for state persistence
import { PersistGate } from 'redux-persist/integration/react'; // Wrapping components for persistence loading state
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'; // Web storage for persistence

/* Redux Persist - Handles state persistence */
// Custom storage implementation for environments without window object (like SSR)
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
		? createNoopStorage() // Use noop storage if no window object
		: createWebStorage('local'); // Default to localStorage for persistence in browsers

// Persist configuration for Redux Persist
const persistConfig = {
	key: 'root', // Root key for persisted storage in localStorage
	storage, // Storage engine (localStorage in browser, noopStorage on SSR)
	whitelist: ['global'], // Only persist the 'global' state (not other slices)
};

// Combine reducers into one root reducer
const rootReducer = combineReducers({
	global: globalReducer, // Main global state reducer
	[api.reducerPath]: api.reducer, // API slice reducer from RTK Query
});

/* Redux Store Configuration */
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () => {
	return configureStore({
		reducer: persistedReducer, // Use the persisted reducer for the store
		middleware: (getDefault) =>
			getDefault({
				serializableCheck: {
					// Ignore Redux Persist actions to avoid serialization warnings
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(api.middleware), // Add RTK Query middleware for API handling
	});
};

/* Type Definitions for Redux */
export type AppStore = ReturnType<typeof makeStore>; // Type for the Redux store
export type RootState = ReturnType<AppStore['getState']>; // Type for the state of the store
export type AppDispatch = AppStore['dispatch']; // Type for the dispatch function of the store
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Custom hook for dispatching actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Custom hook for selecting state

/* Redux Provider Component */
export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>();

	// Initialize store only once (to prevent re-creation of store)
	if (!storeRef.current) {
		storeRef.current = makeStore(); // Create the store
		setupListeners(storeRef.current.dispatch); // Enable automatic refetching with RTK Query
	}

	// Create a persistor for Redux Persist (to persist the state)
	const persistor = persistStore(storeRef.current);

	return (
		<Provider store={storeRef.current}>
			{' '}
			{/* Provide the store to the React app */}
			<PersistGate loading={null} persistor={persistor}>
				{' '}
				{/* PersistGate for handling loading state */}
				{children} {/* Render children once persistence is set up */}
			</PersistGate>
		</Provider>
	);
}
