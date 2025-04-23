// Importing necessary functions from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defining the types for the initial state
export interface initialStateTypes {
	isSideBarCollapsed: boolean; // State for sidebar collapse status
	isDarkModeActive: boolean; // State for dark mode status
}

// Defining the initial state of the slice
const initialState: initialStateTypes = {
	isSideBarCollapsed: false, // Default state for sidebar (not collapsed)
	isDarkModeActive: false, // Default state for dark mode (inactive)
};

// Creating the Redux slice
export const globalSlice = createSlice({
	name: 'global', // Name of the slice (used in actions and reducers)
	initialState, // Setting the initial state defined above
	reducers: {
		// Reducer to update the sidebar collapse state
		setIsSideBarCollapsed: (state, action: PayloadAction<boolean>) => {
			state.isSideBarCollapsed = action.payload; // Updates the state based on the action's payload (boolean value)
		},
		// Reducer to update the dark mode active state
		setIsDarkModeActive: (state, action: PayloadAction<boolean>) => {
			state.isDarkModeActive = action.payload; // Updates the state based on the action's payload (boolean value)
		},
	},
});

export const { setIsSideBarCollapsed, setIsDarkModeActive } =
	globalSlice.actions;
export default globalSlice.reducer;
