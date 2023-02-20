<script lang="ts">
	import { accessToken } from '$lib/stores/spotify_authorization_store';

	const token = $accessToken;

	async function playback(): Promise<void> {
		await fetch('http://localhost:5173/api/v1/spotify_proxy/me/player/play', {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + $accessToken,
				ContentType: 'application/json'
			},
			body: JSON.stringify({
				deviceId: fetchDeviceIdOnCookie(), // todo: これ動的にしないと毎回変わる
				uris: ['spotify:track:6eBiZCdAjVkcuW4h3F94iV']
			})
		});
	}
	function fetchDeviceIdOnCookie(): String {
		const cookieValue =
			document?.cookie
				?.split('; ')
				?.find((row) => row.startsWith('deviceId'))
				?.split('=')[1] || '';
		return cookieValue;
	}
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
					document.cookie = `deviceId=${device_id}`;
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
		<button on:click={playback}>playback_ソワレ</button>
	</body>
</main>

<style>
</style>
