<script lang="ts">
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { collectionName } from "$lib/stores/create";

  export let handleStageFiles: Function;
  export let handleStageText: Function;

  let mode: string = "file";
  let stagedText: string = "";

  function changeMode(updatedMode: string) {
    mode = updatedMode;
  }
</script>

<div class="text-center mb-4">
  <div class="btn-group variant-filled">
    <button
      class="btn {mode == 'file' ? 'bg-primary border-0' : ''}"
      on:mousedown={() => changeMode("file")}>Files</button
    >
    <button
      class="btn {mode == 'text' ? 'bg-primary border-0' : ''}"
      on:mousedown={() => changeMode("text")}>Text</button
    >
  </div>
</div>

<div class="mb-4 font-bold">
  Add sample questions or content for <span class="text-primary">{$collectionName}</span>.
</div>
{#if mode == "file"}
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
    on:drop={async e => await handleStageFiles(e)}
    on:click={async e => await handleStageFiles(e)}
  />
{:else}
  <textarea
    class="textarea w-full border-2 border-gray-400"
    placeholder="Enter your question(s)"
    bind:value={stagedText}
  />

  <div class="flex justify-end">
    <button
      class="btn"
      on:click={() => {
        handleStageText(stagedText);
        stagedText = "";
      }}>Add</button
    >
  </div>
{/if}
