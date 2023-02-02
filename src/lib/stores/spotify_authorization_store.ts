import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export const state = writable('');
export const accessToken = persist(writable(''), createLocalStorage(), 'accessToken'); // 永続化
// todo: 認証前stateを設定できるようにする
// todo: 認証後トークンを設定できるようにする
//       読み書きできるようにする
