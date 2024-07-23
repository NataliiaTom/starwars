"use client"
import useSWR from 'swr';
import { fetcher } from '../services/api';

export const getHeroes = (page) => {
    const pathKey = `/people?page=${page}`;

    const { data, error } = useSWR(pathKey, fetcher, {
        refreshInterval: 10000
    });

    return { data: data || [], loading: !error && !data };
};