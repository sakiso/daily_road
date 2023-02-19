<script lang="ts">
	// import { SpotifyApi } from '$lib/infrastructure/spotify_api';
	import { authenticationCode } from '$lib/stores/spotify_authorization_store';
	import Button, { Label } from '@smui/button';
	import axios from 'axios';

	let myProfile = {};

	function playback(): void {
		//todo: ここでSpotifyAPIに接続して再生する
	}

	async function getAccessToken(): Promise<void> {
		await axios
			.post('/api/v1/spotify_proxy/token', {
				code: $authenticationCode,
				hoge: 'fuga'
				// headers: {
				// 	// contentType: 'application/json'
				// }
			})
			.then((res) => {
				console.log(res);
			});
	}

	function getCurrentUserProfile(): void {
		// const spotifyApi = new SpotifyApi();
		// myProfile = spotifyApi.getCurrentUserProfile($accessToken);
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
		<Button on:click={getAccessToken} variant="raised">
			<Label>getAccessToken!</Label>
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
