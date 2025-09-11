import { api } from './api';
import { Task } from '../models/task';

export const taskApi = api.injectEndpoints({
	endpoints: (build) => ({
		getTasks: build.query<Task[], { projectId: number }>({
			query: ({ projectId }) => `tasks?projectId=${projectId}`,
			providesTags: (result) =>
				result
					? result.map(({ id }) => ({ type: 'Tasks' as const, id }))
					: [{ type: 'Tasks' as const }],
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
			invalidatesTags: ['Tasks'],
		}),
		updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
			query: ({ taskId, status }) => ({
				url: `tasks/${taskId}/status`,
				method: 'PATCH',
				body: { status },
			}),
			invalidatesTags: (result, error, { taskId }) => [
				{ type: 'Tasks', id: taskId },
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
