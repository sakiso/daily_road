<script lang="ts">
	import soiree from '$lib/charts/soiree.json';
	import { Chart } from '$lib/domain_model/chart';
	import type { Note } from '$lib/types/types';
	import { onMount } from 'svelte';

	const NOTE_WIDTH = 70;
	const NOTE_HEIGHT = 10;

	const LANE_COUNT = 4;
	const LANE_SPACING = 5;
	// const HI_SPEED = 1; // いわゆるハイスピ 大きくするとノーツの間隔が開く
	const noteSpeed = 0.5; // ノーツが表示されてから判定ラインに重なるまでの時間。緑数字

	// let notes = [
	// 	// todo: ドメインモデル作ろう Speedは定数で管理しよう
	// 	// todo: どうすればこのpositionをノーツの秒数と一致させられるか？
	// 	{ lane: 0, appearingFrame: 0 },
	// 	{ lane: 1, appearingFrame: 10 },
	// 	{ lane: 2, appearingFrame: 20 },
	// 	{ lane: 3, appearingFrame: 30 },
	// 	{ lane: 1, appearingFrame: 40 },
	// 	{ lane: 0, appearingFrame: 50 },
	// 	{ lane: 3, appearingFrame: 60 },
	// 	{ lane: 2, appearingFrame: 70 }
	// ];
	let notes: Array<Note>;
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

	onMount(() => {
		const chart = new Chart(soiree);
		notes = chart.notes;
		canvas = <HTMLCanvasElement>document.getElementById('game-canvas')!;
		ctx = canvas.getContext('2d')!;
		drawLanes();
		drawNotes();
		drawJudgeLine();
	});

	// function setHiSpeed() {
	// 	notes = notes.map((note) => {
	// 		return {
	// 			...note,
	// 			appearingFrame: note.appearingFrame * noteSpeed
	// 		};
	// 	});
	// }

	function drawLanes() {
		for (let i = 0; i < LANE_COUNT; i++) {
			const x = i * (NOTE_WIDTH + LANE_SPACING);
			const y = 0;
			ctx.fillStyle = '#3d3d3d';
			ctx.fillRect(x, y, NOTE_WIDTH, canvas.height);
			ctx.fillStyle = '#000'; // 初期化しておかないとこれ以降のfill処理が全部同じ色になる
		}
	}

	function drawJudgeLine() {
		for (const note of notes) {
			const x = note.lane * (NOTE_WIDTH + LANE_SPACING);
			const y = 500 - NOTE_HEIGHT;
			ctx.fillStyle = '#93bcf2';
			ctx.fillRect(x, y, NOTE_WIDTH, NOTE_HEIGHT);
			ctx.fillStyle = '#000';
		}
	}

	function drawNotes() {
		for (const note of notes) {
			// レーンの高さ - (レーンの高さ - / 緑数字*60) * appearingFrame
			const x = note.lane * (NOTE_WIDTH + LANE_SPACING);
			const y = 500 - (500 / (noteSpeed * 60)) * note.appearingFrame;
			ctx.fillStyle = '#93bcf2';
			ctx.fillRect(x, y, NOTE_WIDTH, NOTE_HEIGHT);
			ctx.fillStyle = '#000';
		}
	}

	function updateNotes() {
		for (const note of notes) {
			note.appearingFrame -= 1;
		}
	}

	export function gameLoop(timestamp?: DOMHighResTimeStamp) {
		// todo: とりあえず60fpsの前提とするが、ゆくゆくはフレームレートが違っても1秒間に60更新を守らせたい
		// 引数は経過時間が入ってくる
		console.log(timestamp);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawLanes();
		drawJudgeLine();
		updateNotes(); // todo: drawとupdateほんまに両方いる？
		drawNotes();
		timestamp ||= 0;
		elapsedTimeFromGameStart = timestamp;
		if (timestamp < 40000) {
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
	<canvas id="game-canvas" width="290px" height="500" />
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
</style>
