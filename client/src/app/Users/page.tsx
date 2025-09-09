'use client';

import { useGetUsersQuery } from '@/state/api/usersService';
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
import Image from 'next/image';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import Header from '@/components/Header';

const columns: GridColDef[] = [
	{ field: 'userId', headerName: 'ID', width: 100 },
	{ field: 'teamId', headerName: 'Team ID', width: 100 },
	{ field: 'teamName', headerName: 'Team', width: 200 },
	{ field: 'username', headerName: 'Username', width: 150 },
	{
		field: 'profilePictureUrl',
		headerName: 'Profile Picture',
		width: 100,
		renderCell: (params) => (
			<div className="flex h-full w-full items-center justify-center">
				<div className="h-9 w-9">
					{params.value ? (
						<Image
							src={`/${params.value}`}
							alt={params.row.username}
							width={100}
							height={50}
							className="h-full rounded-full object-cover"
						/>
					) : (
						<div className="h-9 w-9 bg-gray-300 rounded-full" />
					)}
				</div>
			</div>
		),
	},
];

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

const Users = () => {
	const { data: users, isLoading, isError } = useGetUsersQuery();
	const isDarkMode = useAppSelector((state) => state.global.isDarkModeActive);
	const [rowSelectionModel, setRowSelectionModel] =
		useState<GridRowSelectionModel>([]);

	if (isLoading) return <div>Loading...</div>;
	if (isError || !users) return <div>Error fetching users</div>;

	console.log(users);

	return (
		<div className="flex w-full flex-col p-8">
			<Header name="Users" />
			<div style={{ height: 650, width: '100%' }}>
				<DataGrid
					rows={users || []}
					columns={columns}
					className={dataGridClassNames}
					getRowId={(row) => row.userId}
					rowSelectionModel={rowSelectionModel}
					onRowSelectionModelChange={(newSelection) => {
						setRowSelectionModel(newSelection);
					}}
					pagination
					slots={{ toolbar: () => <CustomToolbar isDarkMode={isDarkMode} /> }}
					sx={dataGridSxStyles(isDarkMode)}
					checkboxSelection
					disableRowSelectionOnClick={false}
				/>
			</div>
		</div>
	);
};

export default Users;
