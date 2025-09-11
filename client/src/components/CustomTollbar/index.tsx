import {
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import React from 'react';

const CustomToolbar = ({ isDarkMode }: { isDarkMode: boolean }) => (
	<GridToolbarContainer className="toolbar flex gap-2">
		<GridToolbarFilterButton
			slotProps={{
				button: { sx: { color: isDarkMode ? 'white' : 'black' } },
			}}
		/>
		<GridToolbarExport
			slotProps={{
				button: { sx: { color: isDarkMode ? 'white' : 'black' } },
			}}
		/>
	</GridToolbarContainer>
);

export default CustomToolbar;
