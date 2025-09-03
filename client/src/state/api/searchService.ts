import { api } from './api';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { User } from '../models/user';

export interface SearchResults {
	tasks?: Task[];
	projects?: Project[];
	users?: User[];
}

export const searchApi = api.injectEndpoints({
	endpoints: (build) => ({
		search: build.query<SearchResults, string>({
			query: (query) => `search?query=${query}`,
		}),
	}),
});

export const { useSearchQuery } = searchApi;
