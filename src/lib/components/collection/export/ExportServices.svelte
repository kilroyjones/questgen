<script lang="ts">
  import { onMount } from "svelte";
  import SiKahoot from "svelte-icons-pack/si/SiKahoot";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import { goto } from "$app/navigation";

  import type {
    Collection,
    MultipleChoiceQuestion,
    MultipleChoiceAnswer,
    Tag,
  } from "@prisma/client";

  export let collection:
    | (Collection & {
        questions: (MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] })[];
        tags: Tag[];
      })
    | null;

  let services = [
    { name: "Kahoot", icon: "kahoot-icon.png" },
    { name: "Quizizz", icon: "quizizz-icon.png" },
    { name: "Blooket", icon: "blooket-icon.png" },
    { name: "Gimkit", icon: "gimkit-icon.png" },
    { name: "Quizlet", icon: "quizlet-icon.png" },
  ];

  async function process(service: String) {
    if (collection) {
      goto(`/app/collection/export/processing?service=${service}&collectionId=${collection.id}`);
    }
  }

  onMount(async () => {});
</script>

<div class="container mx-auto pr-4 mt-5">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {#each services as service}
      <button
        class="card bg-white p-4 rounded shadow-lg flex flex-col items-center transform transition-transform duration-150 ease-in-out hover:bg-gray-100 active:scale-95 focus:outline-none"
        on:click={() => process(service.name)}
      >
        <div class="icon">
          <img src="/images/services/{service.icon}" width="64" alt="Quizizz" />
          <div>
            <div class="text mt-2">
              <p class="text-gray-600 font-bold">{service.name}</p>
            </div>
          </div>
        </div></button
      >
    {/each}
  </div>
</div>
