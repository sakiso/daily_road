<script>
	import { accessToken } from '$lib/stores/spotify_authorization_store';

	window.onSpotifyWebPlaybackSDKReady = () => {
		const token = $accessToken;
		console.log('🚀 ~ file: +page.svelte:25 ~  $accessToken', $accessToken);
		const player = new Spotify.Player({
			name: 'Web Playback SDK Quick Start Player',
			getOAuthToken: (cb) => {
				cb(token);
			},
			volume: 0.5
		});
		// Ready
		player.addListener('ready', ({ device_id }) => {
			console.log('Ready with Device ID', device_id);
		});

		// Not Ready
		player.addListener('not_ready', ({ device_id }) => {
			console.log('Device ID has gone offline', device_id);
		});

		// Other Utillity Listener
		player.addListener('initialization_error', ({ message }) => {
			console.error(message);
		});

		player.addListener('authentication_error', ({ message }) => {
			console.error(message);
		});

		player.addListener('account_error', ({ message }) => {
			console.error(message);
		});
		player.connect();
	};
</script>

<svelte:head>
	<title>player</title>
	<body>
		<h1>Spotify Web Playback SDK Quick Start</h1>
		<button id="togglePlay">Toggle Play</button>
		<script src="https://sdk.scdn.co/spotify-player.js"></script>
	</body>
</svelte:head>

<main>
	<h1>player</h1>
</main>

<style>
</style>
