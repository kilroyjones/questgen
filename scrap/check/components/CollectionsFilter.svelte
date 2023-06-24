<script lang="ts">
  import { QuestionStatus } from "$lib/models";

  export let handleChangeFilter: Function;

  let questionStatus: QuestionStatus;
</script>

<select
  class="select w-full mx-auto border-2 border-gray-400"
  bind:value={questionStatus}
  on:change={(e) => {
    handleChangeFilter(questionStatus);
  }}
>
  <option value={QuestionStatus.NOTAPPROVED}>Not approved</option>
  <option value={QuestionStatus.APPROVED}>Approved</option>
  <option value={QuestionStatus.DELETED}>Deleted</option>
</select>
