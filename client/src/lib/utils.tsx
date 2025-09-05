export const dataGridClassNames =
	'border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200';

export const dataGridSxStyles = (isDarkMode: boolean) => {
	return {
		// Overall background and text color
		backgroundColor: isDarkMode ? '#1d1f21' : 'white',
		color: isDarkMode ? '#e5e7eb' : 'black',

		// Column headers styling
		'& .MuiDataGrid-columnHeaders': {
			backgroundColor: isDarkMode ? '#1d1f21' : 'white',
			color: isDarkMode ? '#e5e7eb' : 'black',
			borderBottom: `1px solid ${isDarkMode ? '#2d3135' : '#9ba1a6'}`,
			'& [role="row"] > *': {
				backgroundColor: isDarkMode ? '#1d1f21' : 'white',
				borderColor: isDarkMode ? '#2d3135' : '#e0e0e0',
			},
		},

		// Row styling
		'& .MuiDataGrid-row': {
			backgroundColor: isDarkMode ? '#1d1f21' : 'white',
			borderBottom: `1px solid ${isDarkMode ? '#2d3135' : '#e0e0e0'}`,
			transition: 'background-color 0.2s ease-in-out',
		},
		'& .MuiDataGrid-row:hover': {
			backgroundColor: isDarkMode
				? 'rgba(75, 85, 99, 0.5)'
				: 'rgb(229 231 235)',
		},
		'& .MuiDataGrid-row.Mui-selected': {
			backgroundColor: isDarkMode
				? 'rgba(75, 85, 99, 0.5)'
				: 'rgb(229 231 235)',
			border: `1px solid ${isDarkMode ? '#c8cace' : '#1f2937'}`,
		},
		'& .MuiDataGrid-row.Mui-selected:hover': {
			backgroundColor: isDarkMode
				? 'rgba(75, 85, 99, 0.7)'
				: 'rgb(229 231 235)',
		},

		// Cell styling
		'& .MuiDataGrid-cell': {
			border: 'none',
		},
		'& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
			outline: `2px solid ${isDarkMode ? '#c8cace' : '#1f2937'}`,
			outlineOffset: '-1px',
		},

		// Checkboxes and icons
		'& .MuiCheckbox-root': {
			color: isDarkMode ? '#ffffff' : '',
		},
		'& .MuiIconButton-root': {
			color: isDarkMode ? '#a3a3a3' : '',
		},

		// Pagination
		'& .MuiTablePagination-root, & .MuiTablePagination-selectIcon': {
			color: isDarkMode ? '#a3a3a3' : '',
		},

		// General border color
		'& .MuiDataGrid-withBorderColor': {
			borderColor: isDarkMode ? '#c8cace' : '#9ba1a6',
		},
	};
};
