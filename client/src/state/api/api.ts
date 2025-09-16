import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchAuthSession } from 'aws-amplify/auth';

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
		prepareHeaders: async (headers) => {
			const session = await fetchAuthSession();
			const { accessToken } = session.tokens ?? {};

			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`);
			}

			return headers;
		},
	}),
	reducerPath: 'api',
	tagTypes: ['Projects', 'Tasks', 'Users', 'Teams'],
	endpoints: () => ({}),
});
