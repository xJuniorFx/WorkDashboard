import { api } from './api';
import { Project } from '../models/project';

export const projectApi = api.injectEndpoints({
	endpoints: (build) => ({
		getProjects: build.query<Project[], void>({
			query: () => 'projects',
			providesTags: ['Projects'],
		}),
		createProject: build.mutation<Project, Partial<Project>>({
			query: (project) => ({
				url: 'projects',
				method: 'POST',
				body: project,
			}),
			invalidatesTags: ['Projects'],
		}),
	}),
	overrideExisting: false,
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;
