<script lang="ts">
  import Answers from "./components/Answers.svelte";
  import Process from "./components/Process.svelte";
  import { approveQuestion, deleteQuestion } from "./modules/api-calls";

  import type {
    MultipleChoiceQuestion,
    MultipleChoiceAnswer,
  } from "@prisma/client";

  export let question:
    | MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] };

  let removedAnswers: Array<number> = [];

  async function handleApproveQuestion() {
    await approveQuestion(question);
  }

  async function handleDeleteQuestion() {
    await deleteQuestion(question);
  }

  async function handleRemoveAnswer(removedId: number) {
    if (!removedAnswers.includes(removedId)) {
      removedAnswers.push(removedId);
      removedAnswers = removedAnswers;
    } else {
      removedAnswers = removedAnswers.filter((id) => id != removedId);
    }
  }

  async function handleUpdateAnswer(updatedAnswer: MultipleChoiceAnswer) {
    question.answers.forEach(function (currentAnswer) {
      if (currentAnswer.id == updatedAnswer.id) {
        currentAnswer = updatedAnswer;
      }
    });
  }
</script>

<div class="card mb-4">
  <textarea
    class="textarea h-full w-full border-2 border-gray-400"
    bind:value={question.question}
  />
</div>

<div class="flex flex-col">
  <Answers
    {handleUpdateAnswer}
    {handleRemoveAnswer}
    answers={question.answers}
    {removedAnswers}
  />
</div>

<Process {handleApproveQuestion} {handleDeleteQuestion} />
