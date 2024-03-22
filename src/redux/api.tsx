import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {GithubEvent} from '../shared.types';

const baseUrl = 'https://api.github.com/';
// in real project use secure store
const token =
  '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';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Cache-Control', 'no-cache');
      return headers;
    },
  }),
  endpoints: builder => ({
    getEvents: builder.query<GithubEvent[], string>({
      query: count => `events?per_page=${count}`,
      transformResponse: (response: GithubEvent[]) => response.reverse(),
    }),
  }),
});

export const {useGetEventsQuery} = api;
