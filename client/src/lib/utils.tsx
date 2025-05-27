export const dataGridClassNames =
	'border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200';

export const dataGridSxStyles = (isDarkMode: boolean) => {
	return {
		backgroundColor: isDarkMode ? '#1d1f21' : 'white',
		color: isDarkMode ? '#e5e7eb' : 'black',

		'& .MuiDataGrid-columnHeaders': {
			color: isDarkMode ? '#e5e7eb' : '',
			'& [role="row"] > *': {
				backgroundColor: isDarkMode ? '#1d1f21' : 'white',
				borderColor: isDarkMode ? '#2d3135' : '',
			},
		},

		'& .MuiIconButton-root': {
			color: isDarkMode ? '#a3a3a3' : '',
		},
		'& .MuiTablePagination-root': {
			color: isDarkMode ? '#a3a3a3' : '',
		},
		'& .MuiTablePagination-selectIcon': {
			color: isDarkMode ? '#a3a3a3' : '',
		},

		'& .MuiDataGrid-cell': {
			border: 'none',
		},

		'& .MuiDataGrid-row': {
			borderBottom: `1px solid ${isDarkMode ? '#2d3135' : '#e5e7eb'}`,
			transition: 'background-color 0.2s ease-in-out',
		},

		'& .MuiDataGrid-row:hover': {
			backgroundColor: isDarkMode
				? 'rgba(37, 99, 235, 0.15)'
				: 'rgba(234, 119, 168, 0.2)',
		},

		'& .MuiDataGrid-row.Mui-selected': {
			backgroundColor: isDarkMode
				? 'rgba(37, 99, 235, 0.3)' // azul claro no dark
				: 'rgba(234, 119, 168, 0.4)', // rosa claro no light
			border: `1px solid ${isDarkMode ? '#2563EB' : '#e42974'}`, // adiciona borda azul no dark e rosa no light
		},
		'& .MuiDataGrid-row.Mui-selected:hover': {
			backgroundColor: isDarkMode
				? 'rgba(37, 99, 235, 0.3)'
				: 'rgba(234, 119, 168, 0.4)',
		},
		'& .MuiDataGrid-row.Mui-selected.Mui-focusVisible': {
			outline: `2px solid ${isDarkMode ? '#2563EB' : '#e42974'}`,
			outlineOffset: '-1px',
		},
		'& .MuiDataGrid-cell:focus': {
			outline: `2px solid ${isDarkMode ? '#2563EB' : '#e42974'}`,
			outlineOffset: '-1px',
		},
		'& .MuiDataGrid-cell:focus-within': {
			outline: `2px solid ${isDarkMode ? '#2563EB' : '#e42974'}`,
			outlineOffset: '-1px',
		},

		'& .MuiDataGrid-withBorderColor': {
			borderColor: isDarkMode ? '#2d3135' : '#e5e7eb',
		},
	};
};
