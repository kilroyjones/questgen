<script lang="ts">
	import { onMount } from 'svelte';
	import * as pdfjs from 'pdfjs-dist';
	import type { TextItem } from 'pdfjs-dist/types/src/display/api';

	let fileInput: any;
	let content: string | ArrayBuffer | undefined | null;

	async function onFileUpload(e: Event) {
		const file: File | undefined = (e.target as HTMLInputElement)?.files?.[0];
		if (file) {
			const pdfData = new Uint8Array(await file.arrayBuffer());
			console.log(pdfData);
			const loadingTask = pdfjs.getDocument(pdfData);
			const pdf = await loadingTask.promise;
			console.log(pdf, pdf.numPages);
			for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
				const page = await pdf.getPage(pageNum);
				const textContent = await page.getTextContent();
				const text = textContent.items.map((item) => (item as TextItem).str).join(' ');
				console.log(text);
			}
		}
	}

	async function uploadFile() {
		let content = 'ASDFASD';
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

	onMount(() => {
		// uploadFile();
		pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
		// pdfjs.GlobalWorkerOptions.workerSrc = PdfWorker;
		console.log('here', pdfjs.GlobalWorkerOptions.workerSrc);
	});
</script>

<button on:click={uploadFile}> Upload </button>
<input
	class="upload-field"
	type="file"
	accept="pdf"
	on:change={(e) => onFileUpload(e)}
	bind:this={fileInput}
/>
