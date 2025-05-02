import { Task } from '@/state/models/task';
import React from 'react';

type Props = {
	priority: Task['priority'];
};

export const PriorityTag = ({ priority }: Props) => {
	const getColor = () => {
		switch (priority) {
			case 'Urgent':
				return 'bg-red-200 text-red-800';
			case 'High':
				return 'bg-yellow-200 text-yellow-800';
			case 'Medium':
				return 'bg-green-200 text-green-800';
			case 'Low':
				return 'bg-blue-200 text-blue-800';
			default:
				return 'bg-gray-200 text-gray-800';
		}
	};

	return (
		<span
			className={`rounded-full px-2 py-1 text-xs font-semibold ${getColor()}`}
		>
			{priority}
		</span>
	);
};
