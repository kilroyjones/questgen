<script lang="ts">
  import Generating from "$lib/components/collection/create/Generating.svelte";
  import Parameters from "$lib/components/collection/create/Parameters.svelte";
  import {
    collectionName,
    questionCount,
    stagedContentInfo,
    tags,
    resetCreate,
  } from "$lib/stores/create";

  let options: Array<number> = Array.from({ length: 10 }, (_, i) => 5 * (i + 1));
  let selectedOption: number = options[3]; // Default selection
  let isGenerating: boolean = false;

  $questionCount = options[3];

  /**
   *
   */
  function selectOption(option: number) {
    selectedOption = option;
    $questionCount = option;
  }

  /**
   *
   */
  async function generate() {
    let content = await Object.values($stagedContentInfo).reduce(
      (acc, value) => acc + "\n" + value.content,
      ""
    );

    if ($stagedContentInfo.length > 0 && $questionCount > 0) {
      // TODO: Add error handling for all other variables to make sure everything is being submitted.
      // Provide feedback on the processing page.
      fetch("http://localhost:5173/api/collection/create", {
        method: "POST",
        body: JSON.stringify({
          name: $collectionName,
          content: content,
          tags: $tags,
          questionCount: $questionCount,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      resetCreate();
      isGenerating = true;
    }
  }
</script>

{#if isGenerating}
  <Generating />
{:else}
  <Parameters {selectedOption} {selectOption} {options} {generate} />
{/if}
