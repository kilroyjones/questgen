<script lang="ts">
  import SourceDetails from "$lib/components/create/SourceDetails.svelte";
  import Tags from "$lib/components/create/Tags.svelte";
  import { collectionName } from "$lib/stores/create";

  let questionCount: number = 20;
  let options = Array.from({ length: 10 }, (_, i) => 5 * (i + 1));
  let selectedOption = options[3]; // Default selection

  // Function to handle option selection
  function selectOption(option: number) {
    selectedOption = option;
    questionCount = option;
  }
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
      bind:value={questionCount}
    />
  </div>

  <div>
    {#each options as option (option)}
      <button
        class="w-10 text-center m-1 p-2 bg-primary rounded-md {selectedOption === option
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
    <a href="/app/create/add"><button class="btn"> Back </button></a>
  </div>

  <div class="flex mr-3">
    <a href="/app/create/process"><button class="btn"> Generate </button></a>
  </div>
</div>
