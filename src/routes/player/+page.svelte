<script lang="ts">
	import { accessToken } from '$lib/stores/spotify_authorization_store';
	import { onMount } from 'svelte';
	import Game from './game.svelte';

	const token = $accessToken;
	let isGamePlaying: boolean = false;
	let startGame: (timestamp?: DOMHighResTimeStamp) => {}; // 子コンポーネントからゲーム開始の関数を受け取る

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

	onMount(() => {
		(window as any).onSpotifyWebPlaybackSDKReady = () => {
			// todo: リロードしてゲーム画面に来るとAudioContextを手動設定せよとのエラーで再生できないので、
			//       GameStartのクリックでゲームのコンポーネントが読み込まれるようにしたい

			const token = (document as any).getElementById('token').innerHTML;
			const player = new Spotify.Player({
				name: 'Spotify Game Player',
				getOAuthToken: (callback: Function) => {
					callback(token);
				},
				volume: 1.0
			});

			// toggle play
			(document as any).getElementById('togglePlay').onclick = function () {
				player.togglePlay();
			};
			// Listeners
			// Ready
			player.addListener('ready', ({ device_id }: { device_id: string }) => {
				document.cookie = `deviceId=${device_id}`;
			});
			// Player State Changed
			player.addListener('player_state_changed', () => {
				// todo: 「ゲームが開始してるかどうか」はstoreで状態管理する
				if (isGamePlaying) return; // すでにゲームが開始していればgameLoopを呼ばない
				startGame();
				isGamePlaying ||= true;
			});
			player.connect();
		};
	});
</script>

<svelte:head>
	<title>player</title>
</svelte:head>

<main>
	<p id="token" style="display: none;">{token}</p>
	<body>
		<h1>Spotify Web Playback SDK Quick Start</h1>
		<script src="https://sdk.scdn.co/spotify-player.js"></script>
		<button id="togglePlay">Toggle Play</button>
		<button on:click={playback}>playback_ソワレ</button>
		<Game bind:gameLoop={startGame} />
	</body>
</main>

<style>
</style>
