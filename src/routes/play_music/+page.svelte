<script lang="ts">
	import { accessToken } from '$lib/stores/spotify_authorization_store';
	import Button, { Label } from '@smui/button';

	function playback() {
		// todo: 切り出したい
		console.log('playback!');
		console.log($accessToken);
		//todo: ここでSpotifyAPIに接続して再生する
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
	</div>
</main>

<style>
</style>
