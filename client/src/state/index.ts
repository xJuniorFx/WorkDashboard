import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initialStateTypes {
	isSideBarCollapsed: boolean;
	isDarkModeActive: boolean;
}

const initialState: initialStateTypes = {
	isSideBarCollapsed: false,
	isDarkModeActive: false,
};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setIsSideBarCollapsed: (state, action: PayloadAction<boolean>) => {
			state.isSideBarCollapsed = action.payload;
		},
		setIsDarkModeActive: (state, action: PayloadAction<boolean>) => {
			state.isDarkModeActive = action.payload;
		},
	},
});

export const { setIsSideBarCollapsed, setIsDarkModeActive } =
	globalSlice.actions;
export default globalSlice.reducer;
