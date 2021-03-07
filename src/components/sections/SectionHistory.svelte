<script lang="ts">
  import Header from '../Header.svelte'
  import HistoryItem from '../HistoryItem.svelte'
  import { sheet } from '../../stores/data'
</script>

<div class="flex items-center justify-between mb-1">
  <Header title="Transactions"/>

  <button disabled class="disabled:opacity-50 disabled:cursor-not-allowed uppercase font-semibold text-sm p-1">View all</button>
</div>

{#if !$sheet || !$sheet.data === undefined}
  <p>Loading ...</p>
{:else if !$sheet.data?.length}
  <p>No transactions!</p>
{:else}
  <div class="md:h-64 h-36 overflow-y-auto">
    {#each $sheet.data.reverse() as item}
      <HistoryItem {item}></HistoryItem>
    {/each}
  </div>
{/if}
