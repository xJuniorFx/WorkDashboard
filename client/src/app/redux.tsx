import { useRef } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	Provider,
} from 'react-redux';
import globalReducer from '../state/slices/globalSlice'; // Importing the global state reducer
import { api } from '../state/api/api'; // Importing the RTK Query API slice
import { setupListeners } from '@reduxjs/toolkit/query'; // For enabling automatic refetching with RTK Query
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
import { PersistGate } from 'redux-persist/integration/react'; // Wrapper component to handle persistence loading state
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'; // Web storage implementation for persistence

// Redux Persist Configuration
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

// Using in-memory storage for environments without a window (e.g., SSR)
const storage =
	typeof window === 'undefined'
		? createNoopStorage() // Using noop storage if no window object exists (for SSR)
		: createWebStorage('local'); // Default to using localStorage for persistence in browsers

// Persist configuration for Redux Persist
const persistConfig = {
	key: 'root', // Root key for the persisted storage in localStorage
	storage, // Storage engine (localStorage in browsers, noopStorage in SSR)
	whitelist: ['global'], // Only persist the 'global' state, not other slices
};

// Combining reducers into a single root reducer
const rootReducer = combineReducers({
	global: globalReducer, // Main global state reducer
	[api.reducerPath]: api.reducer, // API slice reducer from RTK Query
});

// Wrapping the root reducer with the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const makeStore = () => {
	return configureStore({
		reducer: persistedReducer, // Using the persisted reducer for the store
		middleware: (getDefault) =>
			getDefault({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore Redux Persist actions to avoid serialization warnings
				},
			}).concat(api.middleware), // Add RTK Query middleware for API handling
	});
};

// Type Definitions for Redux Store
export type AppStore = ReturnType<typeof makeStore>; // Type for the Redux store
export type RootState = ReturnType<AppStore['getState']>; // Type for the state of the store
export type AppDispatch = AppStore['dispatch']; // Type for the dispatch function of the store
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Custom hook for dispatching actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Custom hook for selecting state

// Redux Provider Component
export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>();

	// Initialize the store only once (to prevent re-creation of store)
	if (!storeRef.current) {
		storeRef.current = makeStore(); // Create the store
		setupListeners(storeRef.current.dispatch); // Enable automatic refetching with RTK Query
	}

	// Create a persistor for Redux Persist (to persist the state)
	const persistor = persistStore(storeRef.current);

	return (
		<Provider store={storeRef.current}>
			<PersistGate loading={null} persistor={persistor}>
				{children} {/* Render children once persistence is set up */}
			</PersistGate>
		</Provider>
	);
}
