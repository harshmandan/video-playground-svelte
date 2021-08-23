<script lang="ts">
	import logo from "$assets/logo.png";
	import MdIcon from "$src/components/MdIcon.svelte";
	import { mdiPlay } from "@mdi/js";
	import { fly } from "svelte/transition";

	let githubLink = "https://github.com/harshmandan/video-playground-svelte";
	let time = 0;
	let paused = true;
	let duration;
	let videoPlayer;

	let enableCommenting = false;
	let tempCoordinates = {
		x: 0,
		y: 0,
	};

	function handleMouseup(e) {
		enableCommenting = true;
		const boundingRect = videoPlayer.getBoundingClientRect();
		tempCoordinates.x = e.clientX - boundingRect.left;
		tempCoordinates.y = e.clientY - boundingRect.top;
		paused = true;
	}

	let comment = "";

	function addComment() {
		videoComments.push({
			comment: comment,
			time: time,
			posX: tempCoordinates.x,
			posY: tempCoordinates.y,
		});
		comment = "";
		videoComments = videoComments;
		paused = false;
		console.log(videoPlayer.getBoundingClientRect());
	}

	let videoComments = [
		{
			comment: "Colorful sky",
			time: 2.145534,
			posX: 172.9375,
			posY: 110.19999694824219,
		},
		{
			comment: "Greeen Plains!",
			time: 9.039244,
			posX: 190.41249084472656,
			posY: 265.7999954223633,
		},
		{
			comment: "Beautiful River!",
			time: 13.394933,
			posX: 372.41249084472656,
			posY: 132.79999542236328,
		},
		{
			comment: "Where are the feathers at?",
			time: 16.697471,
			posX: 302.41249084472656,
			posY: 169.79999542236328,
		},
		{
			comment: "That was funny",
			time: 22.826864,
			posX: 345.9375,
			posY: 181.1999969482422,
		},

		{
			comment: "Hope its big chungus",
			time: 27.13241,
			posX: 308.8000030517578,
			posY: 184.79999542236328,
		},
		{
			comment: "That is not THE big chungus",
			time: 47.219235,
			posX: 333.9375,
			posY: 217.1999969482422,
		},
		{
			comment: "but he is a THICCC boi",
			time: 50.779625,
			posX: 340.8000030517578,
			posY: 218.79999542236328,
		},
	];

	let cComment;

	function currentComment(time) {
		const i = videoComments.findIndex((o) => Math.floor(o.time) == Math.floor(time));
		cComment = videoComments[i];
		return i > -1 ? true : false;
	}
</script>

<svelte:head>
	<title>Video Player</title>
</svelte:head>

<div class="w-full text-warm-gray-200 h-full bg-black">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-36">
		<div class="flex flex-col space-y-10 py-20 items-center justify-center">
			<a href={githubLink}>
				<img src={logo} class="h-40 w-40" alt="Logo" />
			</a>
			<a href={githubLink} class="text-lg text-orange-600"> video-playground-svelte </a>
			<div class="flex space-x-8 items-start">
				<div class="relative">
					<video
						height="340"
						width="640"
						src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
						on:mouseup={handleMouseup}
						bind:currentTime={time}
						type="video/mp4"
						bind:this={videoPlayer}
						bind:paused
						bind:duration
					>
						<track kind="captions" />
					</video>
					{#if paused}
						<span
							on:click={() => (paused = false)}
							class="absolute cursor-pointer h-full w-full inset-0 flex items-center justify-center"
						>
							<MdIcon icon={mdiPlay} fill="h-20 w-20 fill-orange-600" />
						</span>
					{/if}
					{#if currentComment(time)}
						<div
							transition:fly
							class="absolute  flex flex-col min-w-2 space-y-2"
							style="left: {cComment.posX}px; top: {cComment.posY}px;"
						>
							<span class="h-2 w-2 border-1 border-white bg-black rounded-full" />
							<span class="bg-white text-black shadow rounded p-2">{cComment.comment}</span>
						</div>
					{/if}
				</div>
				<div class="flex flex-col space-y-0.5 overflow-y-auto" style="height:340px">
					<span class="text-lg" on:click={() => console.log(videoComments)}>Comments</span>
					{#each videoComments as cmt}
						<div
							class="py-2 flex flex-col space-y-0.5 {Math.floor(time) == Math.floor(cmt.time)
								? 'text-orange-600'
								: ''}"
						>
							<span class="text-sm">Comment: {cmt.comment}</span>
							<span class="text-xs">Time: {cmt.time.toFixed(2)}</span>
						</div>
					{/each}
				</div>
			</div>

			{#if enableCommenting && paused}
				<div transition:fly class="flex flex-col space-y-4 px-5 md:px-0 items-center overflow-hidden">
					<span class="font-semibold text-3xl">Add a comment</span>
					<div class="flex space-x-2">
						<input
							bind:value={comment}
							type="text"
							class="focus:outline-none focus:border-4 p-3 border-1 border-orange-600 rounded bg-black text-orange-400 "
						/>
						<button
							on:click={() => addComment()}
							class="focus:outline-none bg-orange-600 text-black px-4 py-3 rounded"
						>
							Add
						</button>
					</div>
				</div>
			{/if}

			<div class="flex flex-col space-y-4 px-5 md:px-0 items-center">
				<span class="font-semibold text-3xl">Video Player Info</span>
				<div class="flex space-x-4 items-center">
					<span class="text-orange-600 text-xl">Control playback state</span>
					<button
						on:click={() => (paused = !paused)}
						class="focus:outline-none bg-orange-600 text-black px-8 py-3 rounded"
					>
						{paused ? "Play" : "Pause"}
					</button>
				</div>
				<div class="flex space-x-4 items-center">
					<span class="text-orange-600 text-xl">Current Time (in seconds)</span>
					<span
						class="focus:outline-none bg-black text-orange-600 border-2 border-orange-600 px-8 py-3 rounded"
					>
						{time.toFixed(2)} s
					</span>
				</div>
				<div class="flex space-x-4 items-center">
					<span class="text-orange-600 text-xl">Current Time (in seconds)</span>
					<span
						class="focus:outline-none bg-black text-orange-600 border-2 border-orange-600 px-8 py-3 rounded"
					>
						{#if !duration}
							. . .
						{:else}
							{duration.toFixed(2)} s
						{/if}
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
