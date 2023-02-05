import { persist, createLocalStorage, persistBrowserSession } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export const state = persistBrowserSession(writable(''), 'spotifyState'); // 永続化
export const accessToken = persist(writable(''), createLocalStorage(), 'spotifyAccessToken'); // 永続化
// todo: 認証前stateを設定できるようにする
// todo: 認証後トークンを設定できるようにする
//       読み書きできるようにする
