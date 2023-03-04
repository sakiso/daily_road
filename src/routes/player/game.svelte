<script lang="ts">
	import { onMount } from 'svelte';

	const NOTE_WIDTH = 70;
	const NOTE_HEIGHT = 5;
	const LANE_COUNT = 4;
	const LANE_SPACING = 5;
	const NOTE_SPEED = 1;
	const NOTE_HI_SPEED = 3;

	const NOTES = [
		// todo: ドメインモデル作ろう Speedは定数で管理しよう
		// todo: どうすればこのpositionをノーツの秒数と一致させられるか？
		{ lane: 0, position: 0 },
		{ lane: 1, position: -10 },
		{ lane: 2, position: -20 },
		{ lane: 3, position: -30 },
		{ lane: 1, position: -40 },
		{ lane: 0, position: -50 },
		{ lane: 3, position: -60 },
		{ lane: 2, position: -70 }
	];

	let elapsedTimeFromGameStart = 0;
	let key = '';
	let latestKeyDownTimes = {
		d: 0,
		f: 0,
		j: 0,
		k: 0
	};
	let ctx: CanvasRenderingContext2D;
	let canvas: HTMLCanvasElement;
	let isGamePlaying: boolean = false;

	onMount(() => {
		canvas = <HTMLCanvasElement>document.getElementById('game-canvas')!;
		ctx = canvas.getContext('2d')!;
		drawLanes();
	});

	function drawLanes() {
		for (let i = 0; i < LANE_COUNT; i++) {
			const x = i * (NOTE_WIDTH + LANE_SPACING);
			const y = 0;
			ctx.fillStyle = '#354f77';
			ctx.fillRect(x, y, NOTE_WIDTH, canvas.height);
			ctx.fillStyle = '#000'; // 初期化しておかないとこれ以降のfill処理が全部同じ色になる
		}
	}

	function drawNotes() {
		for (const note of NOTES) {
			const x = note.lane * (NOTE_WIDTH + LANE_SPACING);
			const y = note.position * NOTE_HI_SPEED;
			ctx.fillStyle = '#70e5ba';
			ctx.fillRect(x, y, NOTE_WIDTH, NOTE_HEIGHT);
		}
	}

	function updateNotes() {
		for (const note of NOTES) {
			note.position += NOTE_SPEED;
		}
	}

	export function gameLoop(timestamp?: DOMHighResTimeStamp) {
		isGamePlaying ||= true;

		console.log(timestamp);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawLanes();
		drawNotes();
		updateNotes();
		timestamp ||= 0;
		elapsedTimeFromGameStart = timestamp;
		if (timestamp < 10000) {
			// 開発用に一定時間で止める
			requestAnimationFrame(gameLoop);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		key = event.key;
		switch (key) {
			case 'd':
				latestKeyDownTimes.d = elapsedTimeFromGameStart;
				break;
			case 'f':
				latestKeyDownTimes.f = elapsedTimeFromGameStart;
				break;
			case 'j':
				latestKeyDownTimes.j = elapsedTimeFromGameStart;
				break;
			case 'k':
				latestKeyDownTimes.k = elapsedTimeFromGameStart;
				break;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />
<main>
	<canvas id="game-canvas" class="game-canvas" />
	<p>
		elapsedTimeFromGameStart: {elapsedTimeFromGameStart}<br />
		keydown log: {key}<br />
		D: {latestKeyDownTimes.d}<br />
		F: {latestKeyDownTimes.f}<br />
		J: {latestKeyDownTimes.j}<br />
		K: {latestKeyDownTimes.k}<br />
	</p>
</main>

<style>
	.game-canvas {
		width: 290px;
		height: 480px;
	}
</style>
