import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

function getGraphQLEndpoint() {
    const base = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';
    let endpoint;
    // If it already ends with /graphql, use as-is
    if (base.replace(/\/+$/, '').endsWith('/graphql')) {
        endpoint = base;
    } else {
        // Otherwise append /graphql to the base site URL
        endpoint = base.replace(/\/+$/, '') + '/graphql';
    }
    // Add cache-busting query parameter
    const separator = endpoint.includes('?') ? '&' : '?';
    return `${endpoint}${separator}_t=${Date.now()}`;
}

const httpLink = new HttpLink({
    uri: getGraphQLEndpoint(),
    credentials: 'same-origin',
    fetchOptions: {
        cache: 'no-store',
    },
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    },
});

// Create a cache that effectively disables caching
const noCacheCache = new InMemoryCache({
    // Disable all caching
    addTypename: false,
});

export const client = new ApolloClient({
    link: httpLink,
    cache: noCacheCache,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            nextFetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
            nextFetchPolicy: 'no-cache',
        },
    },
    // Disable cache entirely
    ssrMode: true,
    ssrForceFetchDelay: 0,
});