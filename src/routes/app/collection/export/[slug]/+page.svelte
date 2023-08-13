<script lang="ts">
  // Components
  import ExportDetails from "$lib/components/collection/export/ExportDetails.svelte";
  import ExportServices from "$lib/components/collection/export/ExportServices.svelte";

  // Types
  import type {
    Collection,
    Tag,
    MultipleChoiceQuestion,
    MultipleChoiceAnswer,
  } from "@prisma/client";

  export let data;
  let collection:
    | (Collection & {
        questions: (MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] })[];
        tags: Tag[];
      })
    | null = data.collection;

  $: collection = data.collection;
</script>

<ExportDetails collection={data.collection} />
<ExportServices collection={data.collection} />
