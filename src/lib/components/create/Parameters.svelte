<script lang="ts">
  import SourceDetails from "$lib/components/create/SourceDetails.svelte";
  import Tags from "$lib/components/create/Tags.svelte";
  import { collectionName, questionCount } from "$lib/stores/create";

  export let selectedOption: number;
  export let selectOption: Function;
  export let options: Array<number>;
  export let generate: Function;
</script>

<div class="flex-row">
  <div class="flex font-bold text-xl mb-1 text-primary">{$collectionName}</div>
  <div class="flex">
    <SourceDetails />
  </div>
</div>
<div class="divider" />

<div class="flex font-bold mb-1 pl-1">How many questions to create?</div>
<div class="flex justify-between mb-5">
  <div>
    <input
      class="input input-bordered"
      type="number"
      min="1"
      max="999"
      bind:value={$questionCount}
    />
  </div>

  <div>
    {#each options as option (option)}
      <button
        class="w-10 text-center font-bold m-1 p-2 bg-primary rounded-md {selectedOption === option
          ? 'bg-base-content text-white'
          : ''}"
        on:click={() => selectOption(option)}
      >
        {option}
      </button>
    {/each}
  </div>
</div>

<div class="flex">
  <Tags />
</div>

<div class="flex justify-center mt-5">
  <div class="flex mr-3">
    <a href="/app/create/add" class="btn" data-sveltekit-preload-data="tap">Back</a>
  </div>

  <div class="flex mr-3">
    <button class="btn" data-sveltekit-preload-data="tap" on:click={() => generate()}
      >Generate</button
    >
  </div>
</div>
