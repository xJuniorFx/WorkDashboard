import React from 'react';
import { useDrag } from 'react-dnd';
import { format } from 'date-fns';
import { Task as TaskType } from '@/state/models/task';
import Image from 'next/image';

type TaskProps = {
	task: TaskType;
};

const Task = ({ task }: TaskProps) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'task',
		item: { id: task.id },
		collect: (monitor: any) => ({ isDragging: !!monitor.isDragging() }),
	}));

	const taskTagsSplit = task.tags ? task.tags.split(',') : [];

	const formattedStartDate = task.startDate
		? format(new Date(task.startDate), 'P')
		: '';

	const formattedDueDate = task.dueDate
		? format(new Date(task.dueDate), 'P')
		: '';

	const numberOfComments = (task.comments && task.comments.length) || 0;

	const PriorityTag = ({ priority }: { priority: TaskType['priority'] }) => (
		<div
			className={`rounded-full px-2 py-1 text-xs font-semibold ${
				priority === 'Urgent'
					? 'bg-red-200 text-red-700'
					: priority === 'High'
					? 'bg-yellow-200 text-yellow-700'
					: priority === 'Medium'
					? 'bg-green-200 text-green-700'
					: priority === 'Low'
					? 'bg-blue-200 text-blue-700'
					: 'bg-gray-200 text-gray-700'
			}`}
		>
			{priority}
		</div>
	);

	return (
		<div
			ref={(instance) => {
				drag(instance);
			}}
			className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secundary ${
				isDragging ? 'opacity-50' : 'opacity-100'
			}`}
		>
			{task.attachments && task.attachments.length > 0 && (
				<Image
					src={`/${task.attachments[0].fileUrl}`}
					alt={task.attachments[0].fileName}
					width={400}
					height={200}
					className="h-auto w-full rounded-t-md"
				/>
			)}
		</div>
	);
};

export default Task;
