<script lang="ts">
  // Components
  import Source from "$lib/components/collection/create/Source.svelte";
  import SourceDetails from "$lib/components/collection/create/SourceDetails.svelte";
  import SourceSelection from "$lib/components/collection/create/SourceSelection.svelte";

  // Functions
  import { createQuestions } from "$lib/client/create-api";
  import { getTokenCount, processFiles } from "$lib/client/preprocess";
  import {
    tags,
    collectionName,
    stagedContentInfo,
    tokenTotal,
    estimatedQueries,
  } from "$lib/stores/create";
  import { ContentType } from "$lib/models";

  // Types
  import type { ContentInfo, Result } from "$lib/models";

  let rejectedContentInfo: Array<string> = [];
  let isStagingFiles: boolean = false;
  let isProcessing: boolean = false;
  let currentQuery: number = 0;
  let queryMsgLog: Array<string> = [];

  /**
   * Processes all stagesFiles in order to create questions and add them
   * to the collection.
   */
  async function process(userId: string) {
    let maxContentLength = 3000;
    await Promise.all(
      await $stagedContentInfo.map(async (contentInfo: ContentInfo) => {
        if (contentInfo.type == ContentType.PDF) {
          for (let i = 0; i < contentInfo.content.length; i = i + maxContentLength) {
            currentQuery += 1;
            if (isProcessing) {
              let content = contentInfo.content.substring(i, i + maxContentLength);
              let response = await createQuestions($collectionName, $tags, content);
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
   * The DropZone component attaches files to event. The processFiles function
   * checks if they can be opened and returns two lists which are sorted into
   * staged and rejected. The token total is then updated.
   */
  async function handleStageFiles(event: CustomEvent) {
    rejectedContentInfo = [];

    if (event.detail.acceptedFiles.length > 0) {
      isStagingFiles = true;
      let files: Array<File> = event.detail.acceptedFiles;
      let results = await processFiles($stagedContentInfo.length, files);
      $stagedContentInfo.push(...results[0]);
      $stagedContentInfo = $stagedContentInfo;
      rejectedContentInfo.push(...results[1]);
      rejectedContentInfo = rejectedContentInfo;
      $tokenTotal = $stagedContentInfo.reduce((tokens, file) => tokens + file.tokenCount, 0);
      $estimatedQueries = Math.round($tokenTotal / 3000);

      isStagingFiles = false;
    }
  }

  /**
   * Staging text for processing is only requires creating ContentInfo object.
   * There is no name for the text.
   */
  async function handleStageText(text: string) {
    const tokenCount = await getTokenCount(text);
    const textContent: ContentInfo = {
      id: $stagedContentInfo.length,
      name: "",
      content: text,
      type: ContentType.TEXT,
      tokenCount: tokenCount,
    };
    $stagedContentInfo.push(textContent);
    $stagedContentInfo = $stagedContentInfo;
    $tokenTotal = $stagedContentInfo.reduce((tokens, file) => tokens + file.tokenCount, 0);
    $estimatedQueries = Math.round($tokenTotal / 3000);
  }

  /**
   * Removes already staged content.
   */
  async function handleRemoveStagedContent(id: number) {
    rejectedContentInfo = [];
    $stagedContentInfo = $stagedContentInfo.filter(file => {
      if (file.id !== id) {
        return true;
      } else {
        $tokenTotal -= file.tokenCount;
        return false;
      }
    });
  }

  function clearRejectedLog() {
    rejectedContentInfo = [];
  }
</script>

<SourceSelection {handleStageFiles} {handleStageText} />

<div class="divider" />
{#each $stagedContentInfo as contentInfo}
  <Source {contentInfo} on:click={() => handleRemoveStagedContent(contentInfo.id)} />
{/each}

{#if rejectedContentInfo.length > 0}
  <div class="mb-2">The following files could not be processed:</div>
  <div class="flex justify-between">
    <div class="ml-3">
      {#each rejectedContentInfo as file}
        <div class="text-error-content text-sm">{file}</div>
      {/each}
    </div>
    <div>
      <button
        class="btn btn-square btn-sm hover:text-accent-focus"
        on:click={() => clearRejectedLog()}
      >
        x
      </button>
    </div>
  </div>
{/if}

{#if isStagingFiles}
  <div class="mb-6 mt-2 flex justify-center">
    <img src="/images/loading.gif" alt="Loading" />
  </div>
{/if}

{#if $stagedContentInfo.length > 0}
  <div class="mt-5">
    <SourceDetails />
  </div>
{/if}

<div class="flex justify-center mt-5">
  <div class="flex mr-3">
    <a href="/app/collection/create/select"><button class="btn"> Back </button></a>
  </div>

  {#if $stagedContentInfo.length > 0}
    <div class="flex">
      <a href="/app/collection/create/generate" data-sveltekit-preload-data="tap"
        ><button class="btn"> Next </button></a
      >
    </div>
  {/if}
</div>
