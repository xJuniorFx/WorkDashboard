'use client';

import TaskCard from '@/app/projects/ListView/TaskList';
import { useAppSelector } from '@/app/redux';
import CustomToolbar from '@/components/CustomTollbar';
import Header from '@/components/Header';
import ModalNewTask from '@/components/ModalNewTask';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { useGetTasksByUserQuery } from '@/state/api/taskService';
import {
	useGetAuthUserQuery,
	useGetUserByCognitoIdQuery,
} from '@/state/api/usersService';
import { Priority, Task } from '@/state/models/task';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { PlusSquare } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
	priority: Priority;
};

const columns: GridColDef[] = [
	{
		field: 'title',
		headerName: 'Title',
		width: 100,
	},
	{
		field: 'description',
		headerName: 'Description',
		width: 200,
	},
	{
		field: 'status',
		headerName: 'Status',
		width: 130,
		renderCell: (params) => (
			<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
				{params.value}
			</span>
		),
	},
	{
		field: 'priority',
		headerName: 'Priority',
		width: 75,
	},
	{
		field: 'tags',
		headerName: 'Tags',
		width: 130,
	},
	{
		field: 'startDate',
		headerName: 'Start Date',
		width: 130,
	},
	{
		field: 'dueDate',
		headerName: 'Due Date',
		width: 130,
	},
	{
		field: 'author',
		headerName: 'Author',
		width: 150,
		renderCell: (params) => params.value?.username || 'Unknown',
	},
	{
		field: 'assignee',
		headerName: 'Assignee',
		width: 150,
		renderCell: (params) => params.value?.username || 'Unassigned',
	},
];

const ReusablePriorityPage = ({ priority }: Props) => {
	const [rowSelectionModel, setRowSelectionModel] =
		useState<GridRowSelectionModel>([]);

	const [view, setView] = useState('List');
	const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

	const { data: currentUser } = useGetAuthUserQuery({});
	const cognitoId = currentUser?.user?.userId || currentUser?.userSub;
	const { data: dbUser } = useGetUserByCognitoIdQuery(cognitoId as string, {
		skip: !cognitoId,
	});

	const userId = dbUser?.userId;

	console.log('Cognito:', currentUser);
	console.log('DB User:', dbUser);

	const {
		data: task,
		isLoading,
		isError: isTasksError,
	} = useGetTasksByUserQuery(userId!, { skip: !userId });

	const isDarkMode = useAppSelector((state) => state.global.isDarkModeActive);

	const filteredTasks = task?.filter(
		(task: Task) => task.priority === priority
	);

	if (isLoading) return <div>Loading...</div>;
	if (isTasksError || !task) return <div>Error fetching tasks</div>;

	return (
		<div className=" pl-8 pr-4 xl:pl-10 pb-6 pt-6 lg:pb-4 lg:pt-8">
			<ModalNewTask
				isOpen={isModalNewTaskOpen}
				onClose={() => setIsModalNewTaskOpen(false)}
			/>
			<Header
				name="Priority Page"
				buttoComponent={
					<button
						className="flex items-center justify-center rounded-md bg-[#1f2937] px-3 py-2 text-white hover:bg-[#9ba1a6] dark:bg-[#7b808a] dark:hover:bg-[#c8cace]"
						onClick={() => setIsModalNewTaskOpen(true)}
					>
						<PlusSquare className="mr-2 h-5 w-5" />
						Add Task
					</button>
				}
			/>
			<div className="mb-4 flex justify-start">
				<button
					className={`px-4 py-2 dark:text-white hover:bg-[#9ba1a6] dark:hover:bg-[#c8cace] ${
						view === 'List'
							? 'bg-[#1f2937] dark:bg-[#9ba1a6] text-white'
							: 'bg-white dark:bg-dark-secundary'
					} rounded-l`}
					onClick={() => setView('List')}
				>
					List
				</button>
				<button
					className={`px-4 py-2 dark:text-white  hover:bg-[#9ba1a6] dark:hover:bg-[#c8cace] ${
						view === 'Table'
							? 'bg-[#1f2937] dark:bg-[#9ba1a6] text-white '
							: 'bg-white dark:bg-dark-secundary'
					} rounded-l`}
					onClick={() => setView('Table')}
				>
					Table
				</button>
			</div>
			{isLoading ? (
				<div>Loading tasks...</div>
			) : view === 'List' ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{filteredTasks?.map((task: Task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</div>
			) : (
				view === 'Table' &&
				filteredTasks && (
					<div className="z-0 w-full">
						<DataGrid
							rows={filteredTasks || []}
							columns={columns}
							loading={isLoading}
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
				)
			)}
		</div>
	);
};

export default ReusablePriorityPage;
