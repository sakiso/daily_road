import {
	createLocalStorage,
	persist,
	persistBrowserSession
} from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export const state = persistBrowserSession(writable(''), 'spotifyState'); // 永続化
export const accessToken = persist(writable(''), createLocalStorage(), 'accessToken'); // 永続化
export const refreshToken = persist(writable(''), createLocalStorage(), 'refreshToken'); // 永続化
