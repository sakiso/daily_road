import { state, accessToken } from "$lib/stores/spotify_authorization_store";

export function load({url}: {url: URL}) {
  state.set(url.searchParams.get('state') || "");  
  accessToken.set(url.searchParams.get('code') || "");
}
