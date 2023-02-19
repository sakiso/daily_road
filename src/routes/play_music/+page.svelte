<script lang="ts">
	import { accessToken } from '$lib/stores/spotify_authorization_store';
	import Button, { Label } from '@smui/button';

	let myProfile: any = {};

	async function getTrack(): Promise<void> {
		const response = await fetch(
			'http://localhost:5173/api/v1/spotify_proxy/tracks/6eBiZCdAjVkcuW4h3F94iV',
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + $accessToken
				}
			}
		);
		console.log(await response.json());
	}
	async function getCurrentUserProfile(): Promise<void> {
		const response = await fetch('http://localhost:5173/api/v1/spotify_proxy/me', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + $accessToken
			}
		});
		myProfile = await response.json();
	}
</script>

<svelte:head>
	<title>PlayMusic</title>
</svelte:head>

<main>
	<h1>PlayMusic</h1>
	ここに再生を出したい
	<div>
		<Button on:click={getTrack} variant="raised">
			<Label>GetTrack!</Label>
		</Button>
		<br />
		<Button on:click={getCurrentUserProfile} variant="raised">
			<Label>getMyProfile!</Label>
		</Button>
		{myProfile.display_name}
		<br />
	</div>
	<div>
		<p />
	</div>
</main>

<style>
</style>
