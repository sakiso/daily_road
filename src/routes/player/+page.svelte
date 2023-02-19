<script>
	import { accessToken } from '$lib/stores/spotify_authorization_store';

	const token = $accessToken;
</script>

<svelte:head>
	<title>player</title>
</svelte:head>

<main>
	<p id="token">{token}</p>
	<body>
		<h1>Spotify Web Playback SDK Quick Start</h1>
		<button id="togglePlay">Toggle Play</button>
		<script src="https://sdk.scdn.co/spotify-player.js"></script>
		<script>
			window.onSpotifyWebPlaybackSDKReady = () => {
				const token = document.getElementById('token').innerHTML;
				const player = new Spotify.Player({
					name: 'Spotify Game Player',
					getOAuthToken: (cb) => {
						cb(token);
					},
					volume: 1.0
				});

				// toggle play
				document.getElementById('togglePlay').onclick = function () {
					player.togglePlay();
				};

				// Listeners
				// Ready
				player.addListener('ready', ({ device_id }) => {
					console.log('Ready with Device ID', device_id);
				});
				// Not Ready
				player.addListener('not_ready', ({ device_id }) => {
					console.log('Device ID has gone offline', device_id);
				});
				// Other Utillity
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
	</body>
</main>

<style>
</style>
