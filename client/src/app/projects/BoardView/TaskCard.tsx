import React from 'react';
import { useDrag } from 'react-dnd';
import { format } from 'date-fns';
import { Task as TaskType } from '@/state/models/task';
import Image from 'next/image';
import { EllipsisVertical, MessageSquareMore } from 'lucide-react';
import { PriorityTag } from '@/components/PriorityTag';

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

				<div className="text-sm text-gray-700 dark:text-neutral-200 my-1">
					{formattedStartDate && <span>{formattedStartDate} - </span>}
					{formattedDueDate && <span>{formattedDueDate}</span>}
				</div>

				<p className="text-sm text-gray-700 dark:text-neutral-200">
					{task.description}
				</p>
				<div className="mt-4 border-t border-gray-200 dark:border-x-stroke-dark" />

				<div className="mt-3 flex items-center justify-between">
					<div className="flex -space-x-[6px] overflow-hidden">
						{task.assignee && (
							<Image
								key={task.assignee.userId}
								src={`/${task.assignee.profilePictureUrl!}`}
								alt={task.assignee.username}
								width={40}
								height={40}
								className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secundary"
							/>
						)}
						{task.author && (
							<Image
								key={task.author.userId}
								src={`/${task.author.profilePictureUrl!}`}
								alt={task.author.username}
								width={40}
								height={40}
								className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secundary"
							/>
						)}
					</div>
					<div className="flex items-center gap-1 text-gray-700 dark:text-neutral-200">
						<MessageSquareMore size={20} />
						<span className="mt-1 text-sm dark:text-neutral-400">
							{numberOfComments}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Task;
