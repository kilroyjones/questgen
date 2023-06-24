<script lang="ts">
  import Question from "$lib/components/question/Question.svelte";
  import { onMount } from "svelte";

  import type {
    MultipleChoiceQuestion,
    MultipleChoiceAnswer,
  } from "@prisma/client";

  let question:
    | (MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] })
    | null;

  async function getQuestion() {
    let res = await fetch("http://localhost:5173/api/question/get", {
      method: "POST",
      body: JSON.stringify({
        userId: "97c10b93-4479-4a25-bfed-7f50fb2e64c0",
        questionStatus: 1,
        collectionId: 1,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    return res.json();
  }

  onMount(async () => {
    question = await getQuestion();
    console.log(question);
  });
</script>

{#if question}
  <div class="col-6 form-widget"><Question {question} /></div>
{/if}
