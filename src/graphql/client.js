import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import storage from '../utils/storage';
import config from '../../config';
import { onError } from 'apollo-link-error';

export const API_URI = config.API_URI;

const httpLink = new HttpLink({ uri: API_URI + '/graphql' });

const authLink = setContext(async (_, { headers }) => {
  const token = await storage.getItem('USER_TOKEN');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.token}` : '',
    },
  };
});

const link = onError((e) => {
  console.log('Error Handler ', e);
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: link.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
