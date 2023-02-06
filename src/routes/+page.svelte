<script lang="ts">
	import Button from '@smui/button';
	import Card from '@smui/card';
	import { SpotifyApi } from '$lib/infrastructure/spotify_api';
	import type { RootPageLoadData } from './types';

	export let data: RootPageLoadData;

	function loginSpotify() {
		const spotifyApi = new SpotifyApi();
		spotifyApi.login(data.spotifyClientID);
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
