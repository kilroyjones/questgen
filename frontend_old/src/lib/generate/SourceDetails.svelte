<script lang="ts">
	export let tokenTotal: number;
</script>

<div class="divider" />
<div class="flex">
	<div class="flex-1 font-bold">Tokens: <span class="text-primary">{tokenTotal}</span></div>
	<div class="flex-1 font-bold">
		Estimated queries: <span class="text-primary">{Math.round(tokenTotal / 3000)}</span>
	</div>
</div>
