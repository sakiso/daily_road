<script lang="ts">
	import { accessToken, state } from '$lib/stores/spotify_authorization_store';
</script>

<svelte:head>
	<title>PlayMusic</title>
</svelte:head>

<main>
	<h1>Authorization Info</h1>
	<h2>State</h2>
	{$state}
	<h2>Token</h2>
	{$accessToken}
	<h1>PlayMusic</h1>
	ここに再生を出したい
</main>

<style>
</style>
