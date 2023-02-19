<script lang="ts">
	import Button from '@smui/button';
	import Card from '@smui/card';
	// import { SpotifyApi } from '$lib/infrastructure/spotify_api';
	import type { RootPageLoadData } from './types';
	import { state } from '$lib/stores/spotify_authorization_store';
	import Constants from '$lib/constants';

	export let data: RootPageLoadData;

	function loginSpotify() {
		const clientId = data.spotifyClientID;
		const stateStr = Math.random().toString(36).slice(-5);
		const params = {
			response_type: 'code',
			client_id: clientId,
			state: stateStr,
			scope: 'streaming user-library-read',
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
