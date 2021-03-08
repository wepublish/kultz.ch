import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient} from '../../withApollo';
import type { NormalizedCacheObject } from '@apollo/client';
export async function getServerPageArticleList
    (options: Omit<Apollo.QueryOptions<Types.ArticleListQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ArticleListQuery>({ ...options, query:Operations.ArticleListDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useArticleList = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ArticleListQuery, Types.ArticleListQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ArticleListDocument, options);
};
export type PageArticleListComp = React.FC<{data?: Types.ArticleListQuery, error?: Apollo.ApolloError}>;
export const withPageArticleList = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ArticleListQuery, Types.ArticleListQueryVariables>) => (WrappedComponent:PageArticleListComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ArticleListDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrArticleList = {
      getServerPage: getServerPageArticleList,
      withPage: withPageArticleList,
      usePage: useArticleList,
    }
export async function getServerPageArticle
    (options: Omit<Apollo.QueryOptions<Types.ArticleQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ArticleQuery>({ ...options, query:Operations.ArticleDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useArticle = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ArticleQuery, Types.ArticleQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ArticleDocument, options);
};
export type PageArticleComp = React.FC<{data?: Types.ArticleQuery, error?: Apollo.ApolloError}>;
export const withPageArticle = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ArticleQuery, Types.ArticleQueryVariables>) => (WrappedComponent:PageArticleComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ArticleDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrArticle = {
      getServerPage: getServerPageArticle,
      withPage: withPageArticle,
      usePage: useArticle,
    }
export async function getServerPageList
    (options: Omit<Apollo.QueryOptions<Types.PageListQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PageListQuery>({ ...options, query:Operations.PageListDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useList = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PageListQuery, Types.PageListQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PageListDocument, options);
};
export type PageListComp = React.FC<{data?: Types.PageListQuery, error?: Apollo.ApolloError}>;
export const withPageList = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PageListQuery, Types.PageListQueryVariables>) => (WrappedComponent:PageListComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PageListDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrList = {
      getServerPage: getServerPageList,
      withPage: withPageList,
      usePage: useList,
    }
export async function getServerPage
    (options: Omit<Apollo.QueryOptions<Types.PageQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PageQuery>({ ...options, query:Operations.PageDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const use = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PageQuery, Types.PageQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PageDocument, options);
};
export type PageComp = React.FC<{data?: Types.PageQuery, error?: Apollo.ApolloError}>;
export const withPage = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PageQuery, Types.PageQueryVariables>) => (WrappedComponent:PageComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PageDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssr = {
      getServerPage: getServerPage,
      withPage: withPage,
      usePage: use,
    }
export async function getServerPagePeerProfile
    (options: Omit<Apollo.QueryOptions<Types.PeerProfileQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PeerProfileQuery>({ ...options, query:Operations.PeerProfileDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const usePeerProfile = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PeerProfileQuery, Types.PeerProfileQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PeerProfileDocument, options);
};
export type PagePeerProfileComp = React.FC<{data?: Types.PeerProfileQuery, error?: Apollo.ApolloError}>;
export const withPagePeerProfile = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PeerProfileQuery, Types.PeerProfileQueryVariables>) => (WrappedComponent:PagePeerProfileComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PeerProfileDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrPeerProfile = {
      getServerPage: getServerPagePeerProfile,
      withPage: withPagePeerProfile,
      usePage: usePeerProfile,
    }
export async function getServerPagePeer
    (options: Omit<Apollo.QueryOptions<Types.PeerQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PeerQuery>({ ...options, query:Operations.PeerDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const usePeer = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PeerQuery, Types.PeerQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PeerDocument, options);
};
export type PagePeerComp = React.FC<{data?: Types.PeerQuery, error?: Apollo.ApolloError}>;
export const withPagePeer = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PeerQuery, Types.PeerQueryVariables>) => (WrappedComponent:PagePeerComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PeerDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrPeer = {
      getServerPage: getServerPagePeer,
      withPage: withPagePeer,
      usePage: usePeer,
    }