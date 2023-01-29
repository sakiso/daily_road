<script lang="ts">
	import Button from '@smui/button';
	import Card from '@smui/card';
	import { jumpToSpotifyLoginPage } from './jump_to_spotify_login_page';
	import type { RootPageLoadData } from './types';

	export let data: RootPageLoadData;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main>
	<h1>トップだよ</h1>
	ここに再生を出したい
	<br />
	まずSpotify APIでなんかやる
	<br />
	<Button on:click={() => jumpToSpotifyLoginPage(data.spotifyClientID)}>Login</Button>
</main>

<style>
</style>
