'use client';

import { useGetTasksQuery } from '@/state/api/taskService';
import React, { useState } from 'react';
import { useAppSelector } from '../redux';
import { useGetProjectsQuery } from '@/state/api/projectService';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Header from '@/components/Header';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import CustomToolbar from '@/components/CustomTollbar';

const taskColumns: GridColDef[] = [
	{ field: 'title', headerName: 'Title', width: 150 },
	{ field: 'status', headerName: 'Status', width: 150 },
	{ field: 'priority', headerName: 'Priority', width: 150 },
	{ field: 'dueDate', headerName: 'Due Date', width: 150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const HomePage = () => {
	const [rowSelectionModel, setRowSelectionModel] =
		useState<GridRowSelectionModel>([]);

	const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
		null
	);

	const isDarkMode = useAppSelector((state) => state.global.isDarkModeActive);

	const {
		data: tasks,
		isLoading: taskLoading,
		isError: TaskError,
	} = useGetTasksQuery(
		{ projectId: selectedProjectId ?? 0 },
		{ skip: !selectedProjectId }
	);

	const { data: projects, isLoading: isProjectsLoading } =
		useGetProjectsQuery();

	const priorityCount = (tasks ?? []).reduce<Record<string, number>>(
		(acc, task) => {
			if (task.priority) {
				const key = task.priority as string;
				acc[key] = (acc[key] || 0) + 1;
			}
			return acc;
		},
		{}
	);

	const taskDistribuition = Object.keys(priorityCount).map((key) => ({
		name: key,
		count: priorityCount[key],
	}));

	const statusCount = (projects ?? []).reduce<Record<string, number>>(
		(acc, project) => {
			const status = project.endDate ? 'Completed' : 'Active';
			acc[status] = (acc[status] || 0) + 1;
			return acc;
		},
		{}
	);

	const projectStatus = Object.keys(statusCount).map((status) => ({
		name: status,
		count: statusCount[status],
	}));

	const chartColors = isDarkMode
		? {
				bar: '#8884d8',
				barGrid: '#303030',
				pieFill: '#4A90E2',
				text: '#FFFFFF',
		  }
		: {
				bar: '#8884d8',
				barGrid: '#E0E0E0',
				pieFill: '#82ca9d',
				text: '#000000',
		  };

	if (isProjectsLoading) return <div> Loading Projects ...</div>;
	if (!projects) return <div>No projects found</div>;

	return (
		<div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
			<Header name="Project Management Dashboard" />

			<div className="mb-4">
				<label className="mr-2 text-lg font-semibold dark:text-white">
					Select Project:
				</label>
				<select
					value={selectedProjectId ?? ''}
					onChange={(e) => setSelectedProjectId(Number(e.target.value))}
					className="border rounded px-3 py-2"
				>
					<option value="">-- Choose a project --</option>
					{projects.map((project) => (
						<option key={project.id} value={project.id}>
							{project.name}
						</option>
					))}
				</select>
			</div>

			{selectedProjectId && tasks ? (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secundary">
						<h3 className="mb-3 text-lg font-semibold dark:text-white">
							Task Priority Distribution
						</h3>
						<ResponsiveContainer width={'100%'} height={300}>
							<BarChart data={taskDistribuition}>
								<CartesianGrid
									strokeDasharray={'3 3'}
									stroke={chartColors.barGrid}
								/>
								<XAxis dataKey="name" stroke={chartColors.text} />
								<YAxis stroke={chartColors.text} />
								<Tooltip
									contentStyle={{
										width: 'min-content',
										height: 'min-content',
									}}
								/>
								<Legend />
								<Bar dataKey="count" fill={chartColors.bar} />
							</BarChart>
						</ResponsiveContainer>
					</div>
					<div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secundary">
						<h3 className="mb-3 text-lg font-semibold dark:text-white">
							Project Status
						</h3>
						<ResponsiveContainer width={'100%'} height={300}>
							<PieChart>
								<Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
									{projectStatus.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
					<div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secundary md:col-span-2">
						<h3 className="mb-4 text-lg font-semibold dark:text-white">
							Your Tasks
						</h3>
						<div style={{ height: 400, width: '100%' }}>
							<DataGrid
								rows={tasks || []}
								columns={taskColumns}
								loading={taskLoading}
								getRowClassName={() => 'data-grid-row'}
								getCellClassName={() => 'data-grid-cell'}
								className={dataGridClassNames}
								pagination
								slots={{
									toolbar: () => <CustomToolbar isDarkMode={isDarkMode} />,
								}}
								getRowId={(row) => row.id}
								rowSelectionModel={rowSelectionModel}
								onRowSelectionModelChange={(newSelection) => {
									setRowSelectionModel(newSelection);
								}}
								sx={dataGridSxStyles(isDarkMode)}
								checkboxSelection
								disableRowSelectionOnClick={false}
							/>
						</div>
					</div>
				</div>
			) : (
				<div className="dark:text-white text-base font-semibold">
					Please select a project to view data.
				</div>
			)}
		</div>
	);
};

export default HomePage;
