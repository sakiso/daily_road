// import { state, accessToken } from '$lib/stores/spotify_authorization_store';
// import { error } from '@sveltejs/kit';

export function load({ url }: { url: URL }) {
	const responsedState = url.searchParams.get('state');
	const responsedAccessToken = url.searchParams.get('code');

  return { state: responsedState, accessToken: responsedAccessToken}
}
