import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api/taskService';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

type Props = {
	id: string;
	setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const statusColor: Record<string, string> = {
	'To Do': '#2563EB',
	'Work In Progress': '#ebe425',
	'Under Review': '#eb7b25',
	Completed: '#25eb36',
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
		renderCell: (params) => params.value?.author || 'Unknown',
	},
	{
		field: 'assignee',
		headerName: 'Assignee',
		width: 150,
		renderCell: (params) => params.value?.assignee || 'Unassigned',
	},
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
	const isDarkMode = useAppSelector((state) => state.global.isDarkModeActive);

	const {
		data: tasks,
		isLoading,
		error,
	} = useGetTasksQuery({ projectId: Number(id) });

	if (isLoading) return <div> Loading ...</div>;
	if (error) return <div>An error occurred while fetching the tasks</div>;

	return (
		<div className="h-[540px] w-full px-4 pb-8 xl:px-6">
			<div className="gap-2 py-5">
				<button
					className="flex items-center rounded bg-[#e42974] px-3 py-2 text-white hover:bg-[#801741] dark:bg-[#2563EB] dark:hover:bg-[#14357d]"
					onClick={() => setIsModalNewTaskOpen(true)}
				>
					Add New Task
				</button>
			</div>
			<DataGrid
				rows={tasks || []}
				columns={columns}
				className={dataGridClassNames}
			/>
		</div>
	);
};

export default TableView;
