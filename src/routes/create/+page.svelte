<script lang="ts">
  import Source from "./components/Source.svelte";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { processFiles } from "./modules/preprocess";
  import SourceDetails from "./components/SourceDetails.svelte";
  import Tags from "./components/Tags.svelte";
  import CollectionParameters from "./components/CollectionParameters.svelte";
  import { tags, collectionName } from "./modules/state";

  import type { FileData } from "$lib/models";

  let stagedFiles: Array<FileData> = [];
  let rejectFiles: Array<string> = [];
  let isStagingFiles: boolean = false;
  let tokenTotal: number = 0;

  async function generate() {
    let maxContentLength = 3000;
    await Promise.all(
      await stagedFiles.map(async (file: FileData) => {
        for (let i = 0; i < file.content.length; i = i + maxContentLength) {
          console.log(i);
          console.log($collectionName);
          let resp = await fetch("http://localhost:5173/api/question/create", {
            method: "POST",
            body: JSON.stringify({
              collectionName: $collectionName,
              tags: $tags,
              content: file.content.substring(i, i + maxContentLength),
            }),
            headers: {
              "content-type": "application/json",
            },
          });
        }
      })
    );
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
      tokenTotal = stagedFiles.reduce((tokens, file) => tokens + file.tokenCount, 0);
      isStagingFiles = false;
    }
  }

  async function remove(id: number) {
    rejectFiles = [];
    stagedFiles = stagedFiles.filter(file => {
      if (file.id !== id) {
        return true;
      } else {
        tokenTotal -= file.tokenCount;
        return false;
      }
    });
  }
</script>

<div class="flex flex-wrap mt-10">
  <div class="w-full md:w-1/4" />
  <div class="w-full md:w-1/2 lg:w-5/12">
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
      on:drop={async e => await onStageFiles(e)}
      on:click={async e => await onStageFiles(e)}
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
        <img src="images/loading.gif" alt="Loading" />
      </div>
    {/if}

    {#if stagedFiles.length > 0 || isStagingFiles}
      <div class="mt-5">
        <SourceDetails {tokenTotal} />
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
  </div>
  <div class="w-full md:w-1/4" />
</div>
