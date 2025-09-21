import { api } from './api';
import { Task } from '../models/task';

export const taskApi = api.injectEndpoints({
	endpoints: (build) => ({
		getTasks: build.query<Task[], { projectId: number }>({
			query: ({ projectId }) => `tasks?projectId=${projectId}`,
			providesTags: (result, error, { projectId }) => [
				{ type: 'Tasks', id: projectId },
				...(result
					? result.map(({ id }) => ({ type: 'Tasks' as const, id }))
					: []),
			],
		}),
		getTasksByUser: build.query<Task[], number>({
			query: (userId) => `tasks/user/${userId}`,
			providesTags: (result, error, userId) =>
				result
					? result.map(({ id }) => ({ type: 'Tasks', id }))
					: [{ type: 'Tasks', id: userId }],
		}),
		createTask: build.mutation<Task, Partial<Task>>({
			query: (task) => ({
				url: 'tasks',
				method: 'POST',
				body: task,
			}),
			invalidatesTags: (result, error, task) =>
				task?.projectId ? [{ type: 'Tasks', id: task.projectId }] : ['Tasks'],
		}),
		updateTaskStatus: build.mutation<
			Task,
			{ taskId: number; status: string; projectId: number }
		>({
			query: ({ taskId, status }) => ({
				url: `tasks/${taskId}/status`,
				method: 'PATCH',
				body: { status },
			}),
			invalidatesTags: (result, error, { projectId }) => [
				{ type: 'Tasks', id: projectId },
			],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useUpdateTaskStatusMutation,
	useGetTasksByUserQuery,
} = taskApi;
