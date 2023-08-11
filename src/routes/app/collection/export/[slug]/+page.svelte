<script lang="ts">
  import ExportDetails from "$lib/components/collection/export/ExportDetails.svelte";
  import type { Collection, Tag } from "@prisma/client";
  export let data;

  let collection:
    | (Collection & {
        tags: Tag[];
      })
    | null = data.collection;

  $: collection = data.collection;
</script>

<ExportDetails collection={data.collection} />
