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
		createTask: build.mutation<Task, Partial<Task>>({
			query: (task) => ({
				url: 'tasks',
				method: 'POST',
				body: task,
			}),
			invalidatesTags: ['Tasks'],
			// Force refetch of tasks after creation
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					// Invalidate and refetch tasks for this project
					dispatch(taskApi.util.invalidateTags(['Tasks']));
				} catch {}
			},
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
} = taskApi;
