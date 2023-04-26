<script lang="ts">
  export let data;

  let collection = data;
  console.log(data);
</script>

{#if collection}
  <div class="flex mb-0 mt-8">
    <div class="w-full md:w-1/4" />
    <div class="w-full md:w-1/2 lg:w-5/12">
      <div class="flex flex-col">
        {#each collection.questions as question}
          <div class="card bg-base-200 p-3 mb-2">
            {question.question}
          </div>
        {/each}
      </div>
    </div>
    <div class="w-full md:w-1/4" />
  </div>
{/if}
