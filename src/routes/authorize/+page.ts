import { state, accessToken } from "$lib/stores/spotify_authorization_store";

// todo: ここでクエリパラメータからtokenとstateを受け取る
// todo: ここでstoreにセットしてるのはだめっぽい loadで返してSvelteでStoreに書き込もう
export function load({url}: {url: URL}) {
  console.log('load!')
  state.set(url.searchParams.get('state') || "");  
  accessToken.set(url.searchParams.get('code') || "");
}
