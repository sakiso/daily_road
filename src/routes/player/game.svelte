<script lang="ts">
	import { onMount } from 'svelte';
	onMount(() => {
		const canvas = <HTMLCanvasElement>document.getElementById('game-canvas')!;
		var ctx = canvas.getContext('2d')!;

		const LANE_WIDTH = 80;
		const LANE_HEIGHT = canvas.height;
		const LANE_COUNT = 4;
		const LANE_SPACING = (canvas.width - LANE_WIDTH * LANE_COUNT) / (LANE_COUNT + 1);

		for (let i = 0; i < LANE_COUNT; i++) {
			const x = LANE_SPACING + i * (LANE_WIDTH + LANE_SPACING);
			const y = 0;
			ctx.fillRect(x, y, LANE_WIDTH, LANE_HEIGHT);
		}

		const NOTES = [
			{ lane: 0, position: 0, speed: 5 },
			{ lane: 1, position: 0, speed: 5 },
			{ lane: 2, position: 0, speed: 5 },
			{ lane: 3, position: 0, speed: 5 }
		];

		function drawNotes() {
			for (const note of NOTES) {
				const x = LANE_SPACING + note.lane * (LANE_WIDTH + LANE_SPACING);
				const y = note.position;
				ctx.fillRect(x, y, LANE_WIDTH, LANE_HEIGHT / 8);
			}
		}

		function updateNotes() {
			for (const note of NOTES) {
				note.position += note.speed;
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
	gameだよ
	<canvas id="game-canvas" />
</main>

<style>
</style>
