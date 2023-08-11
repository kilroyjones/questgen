<script lang="ts">
  import { collectionName } from "$lib/stores/create";
</script>

<div class="flex flex-col justify-center mt-5">
  <div class="text-center text-lg mb-2">
    <p>
      Your request to create the collection <span class="text-primary font-bold"
        >{$collectionName}</span
      > is being processed.
    </p>
  </div>
  <div class="text-center text-lg">
    Depending on the number of questions requested, this could take upwards of a few minutes. You
    can wait here until it's finished processing or check the <a
      href="/app/collection"
      class="link text-primary font-bold"
    >
      Collections</a
    > page in a bit.
  </div>
</div>
