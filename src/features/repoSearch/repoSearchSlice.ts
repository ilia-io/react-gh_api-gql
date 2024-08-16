import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../../graphql/queries';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

interface RepoState {
  repos: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RepoState = {
  repos: [],
  loading: false,
  error: null,
};

export const fetchRepos = createAsyncThunk(
  'repoSearch/fetchRepos',
  async (query: string) => {
    const { data } = await client.query({
      query: SEARCH_REPOSITORIES,
      variables: { query, first: 100 },
    });
    return data.search.edges.map((edge: any) => edge.node);
  }
);

const repoSearchSlice = createSlice({
  name: 'repoSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repositories';
      });
  },
});

export default repoSearchSlice.reducer;
