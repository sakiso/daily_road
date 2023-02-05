<script lang="ts">
	import Button, { Label } from '@smui/button';

	function playback() {
		console.log('playback!');
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
