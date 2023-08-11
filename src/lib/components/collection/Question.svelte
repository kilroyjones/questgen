<script lang="ts">
  import AiOutlineEdit from "svelte-icons-pack/ai/AiOutlineEdit";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import type {
    MultipleChoiceAnswer,
    MultipleChoiceQuestion,
  } from "@prisma/client";

  export let handleSelectQuestion: Function;
  export let toggleShowModal: svelte.JSX.MouseEventHandler<HTMLSpanElement> &
    svelte.JSX.KeyboardEventHandler<HTMLSpanElement>;
  export let question:
    | MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] };
</script>

<div class="flex justify-between">
  <div class="flex w-full font-bold">
    <div class="flex mr-3">
      <input
        type="checkbox"
        checked={false}
        on:click|stopPropagation={() => handleSelectQuestion(question)}
      />
    </div>
    <div class="flex">{question.question}</div>
  </div>
  <div class="flex-4 flex-row ml-4 min-w-[2rem] justify-end">
    <div class="flex">
      <span
        on:click|stopPropagation={toggleShowModal}
        on:keydown={toggleShowModal}
        class="mr-2"
      >
        <Icon size="28" src={AiOutlineEdit} />
      </span>
    </div>
  </div>
</div>
