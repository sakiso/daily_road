<script lang="ts">
	import { accessToken, state } from '$lib/stores/spotify_authorization_store';
	// todo: リロードすると一瞬トークンなどが表示されるけどそのあと消える なんで？

	console.log($state);
</script>

<svelte:head>
	<title>PlayMusic</title>
</svelte:head>

<main>
	<h1>Authorization Info</h1>
	<h2>State</h2>
	{$state || 'no-state'}
	<h2>Token</h2>
	{$accessToken || 'no-token'}
	<h1>PlayMusic</h1>
	ここに再生を出したい
</main>

<style>
</style>
