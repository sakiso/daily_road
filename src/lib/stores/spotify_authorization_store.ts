import { writable } from 'svelte/store';

export const state = writable("");
export const accessToken = writable("");
// todo: 永続化
// todo: 認証前stateを設定できるようにする
// todo: 認証後トークンを設定できるようにする
//       読み書きできるようにする

