<script lang="ts">
  import Source from "./components/Source.svelte";
  import { processFiles } from "./modules/preprocess";
  import SourceDetails from "./components/SourceDetails.svelte";
  import Tags from "./components/Tags.svelte";
  import CollectionParameters from "./components/CollectionParameters.svelte";
  import { tags, collectionName } from "./modules/state";
  import type { PageData } from "./$types";
  import { createQuestions } from "./modules/api";
  import { getTokenCount } from "./modules/preprocess";

  import type { FileData, Result } from "$lib/models";
  import { FileType } from "$lib/models";
  import SourceSelection from "./components/source-selection/SourceSelection.svelte";

  export let data: PageData;

  let stagedContent: Array<FileData> = [];
  let rejectFiles: Array<string> = [];
  let isStagingFiles: boolean = false;
  let tokenTotal: number = 0;
  let isProcessing: boolean = false;
  let isProcessingComplete: boolean = false;
  let currentQuery: number = 0;
  let estimatedQueries: number = 0;
  let queryMsgLog: Array<string> = [];

  /**
   * Processes all stagesFiles in order to create questions and add them
   * to the collection.
   */
  async function process(userId: string) {
    // TODO: Break this up a bit
    let maxContentLength = 3000;
    await Promise.all(
      await stagedContent.map(async (file: FileData) => {
        if (file.fileType == FileType.PDF) {
          for (let i = 0; i < file.content.length; i = i + maxContentLength) {
            currentQuery += 1;
            if (isProcessing) {
              let content = file.content.substring(i, i + maxContentLength);
              let response = await createQuestions(userId, $collectionName, $tags, content);
              let result: Result = await response.json();
              if (result.status == "success") {
                queryMsgLog.push(`Added: ${result.data.count}`);
              } else {
                queryMsgLog.push(`Error processing!`);
              }
              queryMsgLog = queryMsgLog;
            }
          }
        }
      })
    );
  }

  /**
   * Generate sends the content to be turned into questions if the user is logged
   * in and there are files which have been staged.
   */
  async function generate() {
    if (stagedContent.length > 0) {
      isProcessing = true;
      if (data.session?.user.id) {
        process(data.session?.user.id);
      }
      isProcessingComplete = true;
    }
  }

  async function handleStageFiles(event: CustomEvent) {
    rejectFiles = [];

    if (event.detail.acceptedFiles.length > 0) {
      isStagingFiles = true;
      let files: Array<File> = event.detail.acceptedFiles;
      let results = await processFiles(stagedContent.length, files);
      stagedContent.push(...results[0]);
      rejectFiles.push(...results[1]);
      stagedContent = stagedContent;
      rejectFiles = rejectFiles;
      tokenTotal = stagedContent.reduce((tokens, file) => tokens + file.tokenCount, 0);
      estimatedQueries = Math.round(tokenTotal / 3000);
      isStagingFiles = false;
    }
  }

  async function handleStageText(text: string) {
    const tokenCount = await getTokenCount(text);
    const textContent = new FileData(stagedContent.length, "", text, FileType.TEXT, tokenCount);
    stagedContent.push();
  }

  async function remove(id: number) {
    rejectFiles = [];
    stagedContent = stagedContent.filter(file => {
      if (file.id !== id) {
        return true;
      } else {
        tokenTotal -= file.tokenCount;
        return false;
      }
    });
  }

  async function cancelProcessing() {
    isProcessing = false;
  }

  async function resetProcessing() {
    isProcessing = false;
    isProcessingComplete = false;
    queryMsgLog = [];
    estimatedQueries = 0;
  }
</script>

<SourceSelection {handleStageFiles} {handleStageText} />

<div class="divider" />
{#each stagedContent as file}
  <Source filename={file.name} on:click={() => remove(file.id)} />
{/each}

{#if rejectFiles.length > 0}
  <div class="mb-2">The following files could not be processed:</div>
  <div class="ml-3">
    {#each rejectFiles as file}
      <div class="text-error-content text-sm">{file}</div>
    {/each}
  </div>
{/if}

{#if isStagingFiles}
  <div class="mb-6 mt-2 flex justify-center">
    <img src="/images/loading.gif" alt="Loading" />
  </div>
{/if}

{#if stagedContent.length > 0 || isStagingFiles}
  <div class="mt-5">
    <SourceDetails {tokenTotal} {estimatedQueries} />
  </div>

  <div class="mt-5">
    <CollectionParameters />
  </div>

  <div class="mt-5 mb-5">
    <Tags />
  </div>

  <div class="divider" />
  <button class="btn" on:click={generate}> Generate </button>
{/if}

{#if isProcessing}
  <div class="mt-6 mb-4 text-lg">
    Processing request: {currentQuery} of estimated {estimatedQueries}
  </div>
  <hr />
  <div class="mb-4">
    {#each queryMsgLog as msg}
      <div>{msg}</div>
    {/each}
  </div>
  {#if queryMsgLog.length > 0}
    <hr />
  {/if}
  {#if !isProcessingComplete}
    <div class="flex justify-end">
      <button class="btn" on:click={cancelProcessing}>Cancel</button>
    </div>
  {:else}
    <div class="flex justify-end mt-3">
      <button class="btn" on:click={resetProcessing}>Ok</button>
    </div>
  {/if}
{/if}
