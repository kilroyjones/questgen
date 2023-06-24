<script lang="ts">
  import Source from "./components/Source.svelte";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { processFiles } from "./modules/preprocess";
  import SourceDetails from "./components/SourceDetails.svelte";
  import Tags from "./components/Tags.svelte";
  import CollectionParameters from "./components/CollectionParameters.svelte";
  import { tags, collectionName } from "./modules/state";
  import type { PageData } from "./$types";
  import { createQuestions } from "./modules/api";

  import type { FileData, Result } from "$lib/models";

  export let data: PageData;

  let stagedFiles: Array<FileData> = [];
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
    let maxContentLength = 3000;
    await Promise.all(
      await stagedFiles.map(async (file: FileData) => {
        for (let i = 0; i < file.content.length; i = i + maxContentLength) {
          currentQuery += 1;
          if (isProcessing) {
            let content = file.content.substring(i, i + maxContentLength);
            let response = await createQuestions(
              userId,
              $collectionName,
              $tags,
              content
            );
            let result: Result = await response.json();
            if (result.status == "success") {
              queryMsgLog.push(`Added: ${result.data.count}`);
            } else {
              queryMsgLog.push(`Error processing!`);
            }
            queryMsgLog = queryMsgLog;
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
    if (stagedFiles.length > 0) {
      isProcessing = true;
      if (data.session?.user.id) {
        process(data.session?.user.id);
      }
      isProcessingComplete = true;
    }
  }

  async function onStageFiles(event: CustomEvent) {
    rejectFiles = [];

    if (event.detail.acceptedFiles.length > 0) {
      isStagingFiles = true;
      let files: Array<File> = event.detail.acceptedFiles;
      let results = await processFiles(stagedFiles.length, files);
      stagedFiles.push(...results[0]);
      rejectFiles.push(...results[1]);
      stagedFiles = stagedFiles;
      rejectFiles = rejectFiles;
      tokenTotal = stagedFiles.reduce(
        (tokens, file) => tokens + file.tokenCount,
        0
      );
      estimatedQueries = Math.round(tokenTotal / 3000);
      isStagingFiles = false;
    }
  }

  async function remove(id: number) {
    rejectFiles = [];
    stagedFiles = stagedFiles.filter((file) => {
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

{#if !isProcessing}
  <Dropzone
    accept={undefined}
    disabled={false}
    maxSize={Infinity}
    minSize={0}
    multiple={true}
    preventDropOnDocument={true}
    noClick={false}
    noKeyboard={false}
    noDrag={false}
    containerClasses={""}
    containerStyles={""}
    disableDefaultStyles={false}
    inputElement={undefined}
    required={false}
    on:drop={async (e) => await onStageFiles(e)}
    on:click={async (e) => await onStageFiles(e)}
  />

  <div class="divider" />
  {#each stagedFiles as file}
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

  {#if stagedFiles.length > 0 || isStagingFiles}
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
{:else}
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
