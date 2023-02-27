<script lang="ts">
	import { accessToken } from '$lib/stores/spotify_authorization_store';
	import Game from './game.svelte';

	const token = $accessToken;

	async function playback(): Promise<void> {
		await fetch('http://localhost:5173/api/v1/spotify_proxy/me/player/play', {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + $accessToken,
				ContentType: 'application/json'
			},
			body: JSON.stringify({
				deviceId: fetchDeviceIdOnCookie(),
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
	<p id="token" style="display: none;">{token}</p>
	<!-- todo: Bodyタグいるの？ -->
	<body>
		<h1>Spotify Web Playback SDK Quick Start</h1>
		<button id="togglePlay">Toggle Play</button>
		<script src="https://sdk.scdn.co/spotify-player.js"></script>
		<script>
			window.onSpotifyWebPlaybackSDKReady = () => {
				// todo: リロードしてゲーム画面に来ると以下のエラーが出て再生できない
				// index.js:3 The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.

				const token = document.getElementById('token').innerHTML;
				const player = new Spotify.Player({
					name: 'Spotify Game Player',
					getOAuthToken: (callback) => {
						callback(token);
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
				// Player State Changed
				player.addListener('player_state_changed', ({ paused }) => {
					console.log('paused of Song', paused);
					// todo: 再生と連動して子コンポーネントGameを開始したい。最初の1回だけ！
					// https://qiita.com/H40831/items/b6e48d74ba9070e66daa
					// ↑子コンポーネントの関数をexportしておき、こっちから実行する
				});
				player.connect();
			};
		</script>
		<button on:click={playback}>playback_ソワレ</button>
		<Game />
	</body>
</main>

<style>
</style>
