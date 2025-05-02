import { Task } from '@/state/models/task';
import Image from 'next/image';
import { format } from 'date-fns';
import React from 'react';
import { PriorityTag } from '../PriorityTag';

type Props = {
	task: Task;
};

const TaskCard = ({ task }: Props) => {
	const taskTagsSplit = task.tags ? task.tags.split(',') : [];

	return (
		<div className="rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg dark:bg-dark-secundary dark:text-white">
			{task.attachments && task.attachments.length > 0 && (
				<div>
					<div className="mb-2">
						<strong className="bold">Attachments</strong>
					</div>
					<div className="mb-3">
						{task.attachments && task.attachments.length > 0 && (
							<Image
								src={`/${task.attachments[0].fileURL}`}
								alt={task.attachments[0].fileName}
								width={400}
								height={200}
								className="rounded-md"
							/>
						)}
					</div>
				</div>
			)}

			<h3 className="mb-2 text-xl font-semibold">{task.title}</h3>

			<div className="mb-2">
				{task.priority && <PriorityTag priority={task.priority} />}
			</div>

			<div className="flex gap-2 mb-2">
				{taskTagsSplit.map((tag) => (
					<div
						key={tag}
						className="rounded-full bg-blue-200 dark:text-blue-800 px-2 py-1 text-xs font-semibold "
					>
						{' '}
						{tag}
					</div>
				))}
			</div>

			<p className="mb-2 text-gray-600 dark:text-gray-300 text-md">
				{task.description || 'No description provided'}
			</p>

			<div className="mb-2 text-md space-y-1">
				<p>
					<span className="font-semibold">Status:</span> {task.status}
				</p>
				<p>
					<span className="font-semibold">Priority:</span> {task.priority}
				</p>
				<p>
					<span className="font-semibold">Start:</span>{' '}
					{task.startDate
						? format(new Date(task.startDate), 'dd/MM/yyyy')
						: 'Not set'}
				</p>
				<p>
					<span className="font-semibold">Due:</span>{' '}
					{task.dueDate
						? format(new Date(task.dueDate), 'dd/MM/yyyy')
						: 'Not set'}
				</p>
			</div>

			<div className="text-md text-gray-500 dark:text-gray-400">
				<p>
					<strong>Author:</strong> {task.author?.username || 'Unknown'}
				</p>
				<p>
					<strong>Assignee:</strong> {task.assignee?.username || 'Unassigned'}
				</p>
			</div>
		</div>
	);
};

export default TaskCard;
