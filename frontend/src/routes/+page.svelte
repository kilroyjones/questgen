<script lang="ts">
	import { onMount } from 'svelte';
	import * as pdfjs from 'pdfjs-dist';
	import type { PDFDocumentProxy, TextItem } from 'pdfjs-dist/types/src/display/api';
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';

	let fileInput: any;
	let pdf: PDFDocumentProxy;
	let pages: number;
	let uploadFiles: Array<File> = [];

	async function onFileUpload(e: Event) {
		const file: File | undefined = (e.target as HTMLInputElement)?.files?.[0];
		if (file) {
			const pdfData = new Uint8Array(await file.arrayBuffer());
			const loadingTask = pdfjs.getDocument(pdfData);
			pdf = await loadingTask.promise;
		}
	}

	async function getPDF(file: File) {
		if (file) {
			const pdfData = new Uint8Array(await file.arrayBuffer());
			const loadingTask = pdfjs.getDocument(pdfData);
			pdf = await loadingTask.promise;
		}
		console.log(pdf.numPages);
	}

	async function removeFile(name: string) {
		uploadFiles = uploadFiles.filter((file) => file.name !== name);
	}

	async function generate() {
		for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
			const page = await pdf.getPage(pageNum);
			const textContent = await page.getTextContent();
			const text = textContent.items.map((item) => (item as TextItem).str).join(' ');
			console.log(text);
		}
	}

	async function queryGPT(content: string) {
		if (content) {
			const response = await fetch('http://localhost:5000/api/submit-file', {
				method: 'POST',
				body: JSON.stringify({
					file: content
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
		}
	}

	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e: any) {
		console.log(e.detail, e, typeof e);
		if (e.detail) {
			console.log(e.detail, e.detail.acceptedFiles.length);
			if (e.detail.acceptedFiles.length > 0) {
				console.log('FUCK');
				console.log(e.detail.acceptedFiles);
				uploadFiles = e.detail.acceptedFiles;
				getPDF(uploadFiles[0]);
			}
		}
		// const { acceptedFiles, fileRejections } = e.detail;
		// files.accepted = [...files.accepted, ...acceptedFiles];
		// files.rejected = [...files.rejected, ...fileRejections];
	}

	onMount(() => {
		pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
	});
</script>

<Dropzone on:drop={handleFilesSelect} />

{#each uploadFiles as file}
	<div>{file.name} <span on:click={() => removeFile(file.name)}>X</span></div>
{/each}

<button on:click={generate}> Generate </button>
<img
	class="upload"
	src="placeholder.png"
	on:click={() => {
		fileInput.click();
	}}
	on:keypress={() => {
		fileInput.click();
	}}
	alt="File upload"
/>
<input
	class="upload-field"
	type="file"
	accept="pdf"
	on:change={(e) => onFileUpload(e)}
	bind:this={fileInput}
/>

<style>
	.upload-field {
		display: none;
	}
</style>
