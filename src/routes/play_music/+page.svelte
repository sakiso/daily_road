<script lang="ts">
	import { SpotifyApi } from '$lib/infrastructure/spotify_api';
	import { accessToken } from '$lib/stores/spotify_authorization_store';
	import Button, { Label } from '@smui/button';

	let myProfile = {};

	function playback(): void {
		console.log('playback!');
		console.log($accessToken);
		//todo: ここでSpotifyAPIに接続して再生する
	}
	function getCurrentUserProfile(): void {
		const spotifyApi = new SpotifyApi();
		myProfile = spotifyApi.getCurrentUserProfile($accessToken);
	}
</script>

<svelte:head>
	<title>PlayMusic</title>
</svelte:head>

<main>
	<h1>PlayMusic</h1>
	ここに再生を出したい
	<div>
		<Button on:click={playback} variant="raised">
			<Label>Playback!</Label>
		</Button>
		<br />
		<br />
		<Button on:click={getCurrentUserProfile} variant="raised">
			<Label>getMyProfile!</Label>
		</Button>
	</div>
	<div>
		<p />
	</div>
</main>

<style>
</style>
