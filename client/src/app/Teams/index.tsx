'use client';

import React, { useState } from 'react';
import { useAppSelector } from '../redux';
import {
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridColDef,
	DataGrid,
	GridRowSelectionModel,
} from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import Header from '@/components/Header';
import { useGetTeamsQuery } from '@/state/api/teamService';

const columns: GridColDef[] = [
	{ field: 'teamId', headerName: 'Team ID', width: 100 },
	{ field: 'teamName', headerName: 'Team Name', width: 200 },
	{ field: 'productOwnerUserId', headerName: 'Product Owner', width: 200 },
	{ field: 'projectManagerUserId', headerName: 'Product Manager', width: 200 },
];

const CustomToolbar = ({ isDarkMode }: { isDarkMode: boolean }) => (
	<GridToolbarContainer className="toolbar flex gap-2">
		<GridToolbarFilterButton
			slotProps={{
				button: {
					sx: {
						color: isDarkMode ? 'white' : 'black',
					},
				},
			}}
		/>
		<GridToolbarExport
			slotProps={{
				button: {
					sx: {
						color: isDarkMode ? 'white' : 'black',
					},
				},
			}}
		/>
	</GridToolbarContainer>
);

const Teams = () => {
	const { data: teams, isLoading, isError } = useGetTeamsQuery();
	const isDarkMode = useAppSelector((state) => state.global.isDarkModeActive);
	const [rowSelectionModel, setRowSelectionModel] =
		useState<GridRowSelectionModel>([]);

	if (isLoading) return <div>Loading...</div>;
	if (isError || !teams) return <div>Error fetching teams</div>;

	return (
		<div className="flex w-full flex-col p-8">
			<Header name="Teams" />
			<div style={{ height: 650, width: '100%' }}>
				<DataGrid
					rows={teams || []}
					columns={columns}
					className={dataGridClassNames}
					rowSelectionModel={rowSelectionModel}
					onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
						setRowSelectionModel(newSelection);
					}}
					pagination
					slots={{
						toolbar: () => <CustomToolbar isDarkMode={isDarkMode} />,
					}}
					sx={dataGridSxStyles(isDarkMode)}
					checkboxSelection
					disableRowSelectionOnClick={false}
				/>
			</div>
		</div>
	);
};

export default Teams;
