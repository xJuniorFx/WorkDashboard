import React from 'react';
import { Task as TaskType } from '@/state/models/task';
import { useDrop } from 'react-dnd';
import { EllipsisVertical, Plus } from 'lucide-react';
import Task from './TaskCard';

type taskColumnProps = {
	status: string;
	tasks: TaskType[];
	moveTask: (taskId: number, toStatus: string) => void;
	setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
	status,
	tasks,
	moveTask,
	setIsModalNewTaskOpen,
}: taskColumnProps) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'Task',
		drop: (item: { id: number }) => moveTask(item.id, status),
		collect: (monitor: any) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const taskCount = tasks.filter((task) => task.status === status).length;

	const statusColor: Record<string, string> = {
		'To Do': '#2563EB',
		'Work In Progress': '#ebe425',
		'Under Review': '#eb7b25',
		Completed: '#25eb36',
	};

	return (
		<div
			ref={(instance) => {
				drop(instance);
			}}
			className={`sl:py-4 rounded-lg py-2 xl:px-2 ${
				isOver ? 'bg-blue-100 dark:bg-neutral-950' : ''
			}`}
		>
			<div className="mb-3 flex w-full">
				<div
					className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
					style={{ backgroundColor: statusColor[status] }}
				/>
				<div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secundary ">
					<h3 className="flex items-center text-lg font-semibold dark:text-white gap-2">
						{status}{' '}
						<span
							className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-base leading-none dark:bg-gray-700 dark:text-gray-200"
							style={{ width: '1.6rem', height: '1.6rem' }}
						>
							{taskCount}
						</span>
					</h3>
					<div className="flex items-center gap-2">
						<button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
							<EllipsisVertical size={26} />
						</button>
						<button
							className="flex h-6 w-5 items-center justify-center rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
							onClick={() => setIsModalNewTaskOpen(true)}
						>
							<Plus size={26} />
						</button>
					</div>
				</div>
			</div>
			{tasks
				.filter((task) => task.status === status)
				.map((task) => (
					<Task key={task.id} task={task} />
				))}
		</div>
	);
};

export default TaskColumn;
