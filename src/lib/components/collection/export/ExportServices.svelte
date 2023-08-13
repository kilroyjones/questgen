<script lang="ts">
  import { onMount } from "svelte";
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

  let services = ["Kahoot"];

  onMount(async () => {
    console.log("HERE", collection);
    let resp = await fetch("http://localhost:5173/api/collection/export", {
      method: "POST",
      body: JSON.stringify({
        collection: collection,
        site: "quizizz",
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  });
</script>

{collection?.questions}
