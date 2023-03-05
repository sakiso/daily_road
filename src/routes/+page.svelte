<script lang="ts">
	import Button from '@smui/button';
	// import { SpotifyApi } from '$lib/infrastructure/spotify_api';
	import Constants from '$lib/constants';
	import { state } from '$lib/stores/spotify_authorization_store';
	import type { RootPageLoadData } from '$lib/types/types';

	export let data: RootPageLoadData;

	function loginSpotify() {
		const clientId = data.spotifyClientID;
		const stateStr = Math.random().toString(36).slice(-5);
		const params = {
			response_type: 'code',
			client_id: clientId,
			state: stateStr,
			scope:
				'streaming user-library-read user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-read-private',
			redirect_uri: 'http://localhost:5173/authorize'
			//todo: 本番移行したときドメインが自動で変わるようにする
		};
		state.set(stateStr); // note: 認証リダイレクト後に同一ユーザか判定するためstoreにstateを保存しておく

		const queryParams = new URLSearchParams(params).toString();
		window.location.href = `${Constants.spotifyAuthorizeUrl}?${queryParams}`;
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main>
	<h1>トップだよ</h1>
	<Button on:click={loginSpotify}>Login</Button>
</main>

<style>
</style>
