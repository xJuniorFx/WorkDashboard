import TaskCard from '@/app/projects/ListView/TaskList';
import { useGetTasksQuery } from '@/state/api/taskService';
import { Task } from '@/state/models/task';
import React from 'react';

type ListProps = {
	id: string;
	setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: ListProps) => {
	const {
		data: tasks,
		isLoading,
		error,
	} = useGetTasksQuery({ projectId: Number(id) });

	if (isLoading) return <div> Loading ...</div>;
	if (error) return <div>An error ocurred while fetching the tasks</div>;

	return (
		<div className="p-4 pb-8 xl:p-6">
			<div className="gap-2 py-5">
				<button
					className="flex items-center rounded bg-[#1f2937] px-3 py-2 text-white hover:bg-[#9ba1a6] dark:bg-[#7b808a] dark:hover:bg-[#c8cace]"
					onClick={() => setIsModalNewTaskOpen(true)}
				>
					Add New Task
				</button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
				{tasks?.map((task: Task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};

export default ListView;
