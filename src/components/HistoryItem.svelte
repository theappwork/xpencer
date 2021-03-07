<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import dayjs from 'dayjs';
  import { Input } from "../model/spreadsheet";

  export let item: Input;

  let isIncome: boolean | null = null;
  let isOpen = false;
  let details: HTMLDetailsElement;

  const onToggle = () => {
    isOpen = details.open;
  }

  onMount(() => {
    isIncome = !item.amount || item.amount === 0 ? null : +item.amount >= 0;
    details.addEventListener('toggle', onToggle);
  })
  onDestroy(() => {
    details.removeEventListener('toggle', onToggle);
  })
</script>

<details bind:this={details} class="{isIncome === null ? 'border-gray-400' : isIncome ? 'border-green-400' : 'border-red-400'} cursor-pointer border-l-4 bg-gray-50 flex flex-col pl-2 py-2 mb-1 shadow rounded-sm">
  <summary class="list-none flex justify-between items-center">
    <div class="flex justify-between items-center w-full">
      <div class="flex flex-col">
        <span>{item.category}</span>
        <small title="{dayjs(item.date).format('YYYY-MM-DD')}" class="text-gray-400">{dayjs(item.date).fromNow()}</small>
      </div>

      <div class="w-24 flex justify-between">
        <span class="font-semibold">{item.currency}</span>
        <span>{Math.abs(item.amount)}</span>
      </div>
    </div>

    <button on:click|preventDefault={() => isOpen = !isOpen} class="w-10 flex items-center justify-center">
      <svg class="{!isOpen ? 'rotate-0' : 'rotate-90'} transition-transform transform-gpu pointer-events-none w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>
  </summary>

  <div class="mt-2 w-full pr-10">
    <p class="text-sm">{item.description}</p>
  </div>
</details>