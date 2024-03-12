<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { PUBLIC_ADDRESS } from "$env/static/public";

  let processing: Boolean = true;
  let error: String | null = null;

  async function process(service: String, collectionId: number) {
    let resp = await fetch(`${PUBLIC_ADDRESS}/api/collection/export`, {
      method: "POST",
      body: JSON.stringify({
        service: service,
        collectionId: collectionId,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  }

  onMount(async () => {
    let service = $page.url.searchParams.get("service");
    let collectionId = $page.url.searchParams.get("collectionId");
    if (service && collectionId) {
      process(service, parseInt(collectionId));
    } else {
    }
  });
</script>

{#if processing}
  <div class="text-accent font-bold processing-animation mb-2" />
{:else if !processing && error == null}
  Here
{/if}

<style>
  @keyframes processing {
    0%,
    100% {
      content: "Processing";
    }
    20% {
      content: "Processing.";
    }
    40% {
      content: "Processing..";
    }
    60% {
      content: "Processing..";
    }
    80% {
      content: "Processing...";
    }
  }

  .processing-animation::before {
    content: "Processing...";
    animation: processing 2s infinite; /* 2s is the duration; adjust as needed */
  }
</style>
