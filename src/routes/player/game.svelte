<script lang="ts">
	import { onMount } from 'svelte';
	onMount(() => {
		const canvas = <HTMLCanvasElement>document.getElementById('game-canvas')!;
		var ctx = canvas.getContext('2d')!;

		const NOTE_WIDTH = 70;
		const NOTE_HEIGHT = 5; //canvas.height;
		const LANE_COUNT = 4;
		const LANE_SPACING = 3;
		const NOTE_SPEED = 1.3;

		for (let i = 0; i < LANE_COUNT; i++) {
			const x = LANE_SPACING + i * (NOTE_WIDTH + LANE_SPACING);
			const y = 0;
			ctx.fillRect(x, y, NOTE_WIDTH, NOTE_HEIGHT);
		}

		const NOTES = [
			//todo: ドメインモデル作ろう Speedは定数で管理しよう
			{ lane: 0, position: 0 },
			{ lane: 1, position: -10 },
			{ lane: 2, position: -20 },
			{ lane: 3, position: -30 },
			{ lane: 1, position: -40 },
			{ lane: 0, position: -50 },
			{ lane: 3, position: -60 },
			{ lane: 2, position: -70 }
		];

		function drawNotes() {
			// todo: canvas外に出たあとも計算しつづけてて無駄なのでなんとかしたいなぁ
			for (const note of NOTES) {
				const x = note.lane * (NOTE_WIDTH + LANE_SPACING);
				const y = note.position;
				ctx.fillRect(x, y, NOTE_WIDTH, NOTE_HEIGHT);
			}
		}

		function updateNotes() {
			for (const note of NOTES) {
				note.position += NOTE_SPEED;
			}
		}

		function gameLoop() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawNotes();
			updateNotes();
			requestAnimationFrame(gameLoop);
		}

		gameLoop();
	});
</script>

<main>
	gameだよ<br />
	<canvas id="game-canvas" class="game-canvas" />
</main>

<style>
	.game-canvas {
		width: 290px;
		height: 480px;
	}
</style>
