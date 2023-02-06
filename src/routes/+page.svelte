<script lang="ts">
	import Button from '@smui/button';
	import Card from '@smui/card';
	import { loginSpotify } from '$lib/infrastructure/spotify_api';
	import type { RootPageLoadData } from './types';

	export let data: RootPageLoadData;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main>
	<h1>トップだよ</h1>
	<Button on:click={() => loginSpotify(data.spotifyClientID)}>Login</Button>
</main>

<style>
</style>
