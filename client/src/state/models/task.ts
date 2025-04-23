import { User } from './user';

export enum Priority {
	Urgent = 'Urgent',
	Hight = 'Hight',
	Medium = 'Medium',
	Low = 'Low',
	Backlog = 'Backlog',
}

export enum Status {
	ToDo = 'To Do',
	WorkInProgress = 'Work in Progress',
	UnderReview = 'Under Review',
	Completed = 'Completed',
}

export interface Attachment {
	id: number;
	fileUrl: string;
	fileName?: string;
	taskId: number;
	uploadedById: number;
}

export interface Task {
	id: number;
	title: string;
	description?: string;
	status?: Status;
	priority?: Priority;
	tags?: string;
	startDate?: string;
	dueDate?: string;
	points?: number;
	projectId: number;
	authorUserId: number;
	assignedUserId?: number;

	author?: User;
	assignee?: User;
	comments?: Comment[];
	attachments: Attachment[];
}
