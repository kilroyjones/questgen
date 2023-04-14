<script lang="ts">
  import Answer from "./components/Answer.svelte";
  import type { Question } from "$lib/models";

  import type { MultipleChoiceAnswer, MultipleChoiceQuestion } from "@prisma/client";
  import { onMount } from "svelte";

  let question: Question | null = null;
  let removedAnswers: Array<number> = [];

  async function getQuestion() {
    let resp = await fetch("http://localhost:5173/api/get-question", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "content-type": "application/json",
      },
    });

    question = await resp.json();
    console.log(question);
  }

  async function removeAnswer(id: number) {
    let idx = removedAnswers.indexOf(id);
    console.log(idx, removedAnswers);
    if (idx > -1) {
      removedAnswers.splice(idx, 1);
    } else {
      removedAnswers.push(id);
    }
    removedAnswers = removedAnswers;
  }

  async function changeAnswer(id: number) {
    question;
  }

  onMount(async () => {
    getQuestion();
  });
</script>

<div class="flex">
  <div class="w-full md:w-1/4" />
  <div class="w-full md:w-1/2 lg:w-5/12 p-8">
    {#if question}
      <input class="input input-bordered w-full mb-5" value={question.question} />
      <div class="flex flex-col">
        {#each question.answers as answer}
          {#if removedAnswers.includes(answer.id) == true}
            <Answer {answer} {removeAnswer} {changeAnswer} disabled={true} />
          {:else}
            <Answer {answer} {removeAnswer} {changeAnswer} disabled={false} />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
  <div class="w-full md:w-1/4" />
</div>
