import { api } from './api';
import { User } from '../models/user';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

export const usersApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<User[], void>({
			query: () => 'users',
			providesTags: ['Users'],
		}),
		getAuthUser: build.query({
			queryFn: async (_, _queryApi, _extraoption, fetchWithBQ) => {
				try {
					const user = await getCurrentUser();
					const session = await fetchAuthSession();
					if (!session) throw new Error('No session found');
					const { userSub } = session;
					const { accessToken } = session.tokens ?? {};

					const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);
					const userDetails = userDetailsResponse.data as User;

					return { data: { user, userSub, userDetails } };
				} catch (error: any) {
					return { error: error.message || 'Could not fetch user data' };
				}
			},
		}),
	}),
});

export const { useGetUsersQuery, useGetAuthUserQuery } = usersApi;
