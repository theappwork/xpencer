<script>
  import Header from '../Header.svelte'
  import { account, sheet, spreadsheet } from '../../stores/data'

  const onAccountChange = (event) => {
    const select = event.target;
    const value = select.value;
    const currentYear = new Date().getFullYear();

    sheet.clear();
    spreadsheet.setCurrentSheet(`${currentYear}-${value}`);
  }

</script>

<div class="flex justify-between mb-2">
  <Header title="Accounts"/>

  <button disabled class="text-sm p-1 font-semibold uppercase">Add new</button>
</div>

{#if !$account.length}
  <p>No accounts!</p>
{:else}
  <label class="flex-col">
    <!-- svelte-ignore a11y-no-onchange-->
    <select name="account" on:change|preventDefault="{onAccountChange}">
      {#each $account as account}
        <option value="{account.toUpperCase()}">{account.toUpperCase()}</option>
      {/each}
    </select>
  </label>
{/if}