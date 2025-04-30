import React from 'react';
import { useDrag } from 'react-dnd';
import { format } from 'date-fns';
import { Task as TaskType } from '@/state/models/task';
import Image from 'next/image';
import { EllipsisVertical } from 'lucide-react';

type TaskProps = {
	task: TaskType;
};

const Task = ({ task }: TaskProps) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'Task',
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
					? 'bg-red-200 '
					: priority === 'High'
					? 'bg-yellow-200'
					: priority === 'Medium'
					? 'bg-green-200'
					: priority === 'Low'
					? 'bg-blue-200'
					: 'bg-gray-200'
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
					src={`/${task.attachments[0].fileURL}`}
					alt={task.attachments[0].fileName}
					width={400}
					height={200}
					className="h-auto w-full rounded-t-md"
				/>
			)}
			<div className="p-4 md:p-6">
				<div className="flex items-start justify-between">
					<div className="flex flex-1 flex-wrap items-center gap-2">
						{task.priority && <PriorityTag priority={task.priority} />}
						<div className="flex gap-2">
							{taskTagsSplit.map((tag) => (
								<div
									key={tag}
									className="rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold "
								>
									{' '}
									{tag}
								</div>
							))}
						</div>
					</div>
					<button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
						<EllipsisVertical size={26} />
					</button>
				</div>

				<div className="my-3 flex items-center justify-between ">
					<h4 className="text-md font-bold dark:text-white">{task.title}</h4>
					{typeof task.points === 'number' && (
						<div className="text-sm font-smibold dark:text-white">
							{task.points} pts
						</div>
					)}
				</div>

				<div className="text-sm text-gray-600 dark:text-neutral-300 my-1">
					{formattedStartDate && <span>{formattedStartDate} - </span>}
					{formattedDueDate && <span>{formattedDueDate}</span>}
				</div>

				<p className="text-sm text-gray-700 dark:text-neutral-200">
					{task.description}
				</p>
				<div className="mt-4 border-t border-gray-200 dark:border-x-stroke-dark" />
			</div>
		</div>
	);
};

export default Task;
