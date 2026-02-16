import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

function getGraphQLEndpoint() {
    const base = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';
    // If it already ends with /graphql, use as-is
    if (base.replace(/\/+$/, '').endsWith('/graphql')) {
        return base;
    }
    // Otherwise append /graphql to the base site URL
    return base.replace(/\/+$/, '') + '/graphql';
}

const httpLink = new HttpLink({
    uri: getGraphQLEndpoint(),
    credentials: 'same-origin',
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});