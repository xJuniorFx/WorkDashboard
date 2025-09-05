import { Team } from '../models/team';
import { api } from './api';

export const teamsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getTeams: build.query<Team[], void>({
			query: () => 'teams',
			providesTags: ['Teams'],
		}),
	}),
});

export const { useGetTeamsQuery } = teamsApi;
