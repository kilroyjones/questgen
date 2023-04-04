<script lang="ts">
	import Source from '$lib/generate/Source.svelte';
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
	import { FileData, processFiles } from './preprocess';

	let stagedFiles: Array<FileData> = [];
	let isStagingFiles: boolean = false;
	let rejectFiles: Array<string> = [];
	let tokenTotal: number = 0;

	async function generate() {
		stagedFiles.forEach(async (file: FileData) => {});
		// const response = await fetch('http://localhost:5000/api/submit-file', {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		file: content
		// 	}),
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	}
		// });
	}

	async function onStageFiles(event: CustomEvent) {
		if (event.detail.acceptedFiles.length > 0) {
			isStagingFiles = true;
			let files: Array<File> = event.detail.acceptedFiles;
			let results = await processFiles(files);
			stagedFiles.push(...results[0]);
			rejectFiles.push(...results[1]);
			stagedFiles = stagedFiles;
			rejectFiles = rejectFiles;
			tokenTotal = stagedFiles.reduce((tokens, file) => tokens + file.tokenCount, 0);
			isStagingFiles = false;
		}
	}

	async function remove(name: string) {
		stagedFiles = stagedFiles.filter((file) => {
			if (file.name !== name) {
				return true;
			} else {
				tokenTotal -= file.tokenCount;
				return false;
			}
		});
	}
</script>

<div class="flex flex-wrap">
	<div class="w-full md:w-1/4" />
	<div class="w-full md:w-1/2 lg:w-5/12 p-8">
		<Dropzone
			accept={'application/pdf'}
			disabled={false}
			maxSize={Infinity}
			minSize={0}
			multiple={true}
			preventDropOnDocument={true}
			noClick={false}
			noKeyboard={false}
			noDrag={false}
			containerClasses={''}
			containerStyles={''}
			disableDefaultStyles={false}
			inputElement={undefined}
			required={false}
			on:drop={async (e) => await onStageFiles(e)}
			on:click={async (e) => await onStageFiles(e)}
		/>

		<div class="divider" />
		{#each stagedFiles as file}
			<Source filename={file.name} on:click={() => remove(file.name)} />
		{/each}

		{#if isStagingFiles}
			<div class="mb-6 mt-2 flex justify-center">
				<img src="images/loading.gif" alt="Loading" />
			</div>
		{/if}

		{#if stagedFiles.length > 0 || isStagingFiles}
			<div class="divider" />
		{/if}

		<div class="flex mb-2">
			<div class="flex-1 font-bold">Tokens: <span class="text-primary">{tokenTotal}</span></div>
			<div class="flex-1 font-bold">
				Estimated queries: <span class="text-primary">{Math.round(tokenTotal / 3000)}</span>
			</div>
		</div>
		<button class="btn" on:click={generate}> Generate </button>
	</div>
	<div class="w-full md:w-1/4" />
</div>
