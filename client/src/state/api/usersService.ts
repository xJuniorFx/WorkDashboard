import { api } from './api';
import { User } from '../models/user';

export const usersApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<User[], void>({
			query: () => 'users',
			providesTags: ['Users'],
		}),
	}),
});

export const { useGetUsersQuery } = usersApi;
