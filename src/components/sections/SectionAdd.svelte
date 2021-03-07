<script lang="ts">
  import Header from '../Header.svelte'
  import InputRadio from '../InputRadio.svelte'
  import { currency, category, spreadsheet, kind } from '../../stores/data'
  import { append } from '../../utils/sheets';
  import { Input } from '../../model/spreadsheet';

  let isLoading = false;

  const addTransaction = async (event: any) => {
    isLoading = true;

    const form = event.target;
    const spreadsheetId = form.dataset.spreadsheetId;
    const spreadsheetSheet = form.dataset.spreadsheetSheet;
    const elements = form.elements;

    const input = new Input(
      new Date().toLocaleString(),
      elements.kind?.value,
      elements.category?.value,
      elements.currency?.value,
      elements.amount?.value,
      elements.description?.value
    );

    await append(spreadsheetId, spreadsheetSheet, [Object.values(input)]);

    isLoading = false;

    spreadsheet.setCurrentSheet(spreadsheetSheet);
  }
</script>

<Header title="Add Transaction"/>

<form
data-spreadsheet-id="{$spreadsheet.id}"
data-spreadsheet-sheet="{$spreadsheet.sheet}"
on:submit|preventDefault="{addTransaction}" autocomplete="off" autocapitalize="off">
  <div class="flex flex-col">
    <label class="row">
      <span class="w-36">Category</span>
      <select required class="mb-1" name="category">
        {#each $category as category}
          <option value="{category}">{category}</option>
        {/each}
      </select>
    </label>

    <div class="mb-1 flex flex-row justify-between">
      <div class="w-36 flex justify-around">
        {#each $currency as value, identifier}
          <InputRadio required class="w-12 h-12" {identifier} checked="{identifier === 0}" group="currency" {value}>
            {value}
          </InputRadio>
        {/each}
      </div>

      <input placeholder="Amount" name="amount" type="number" inputmode="numeric" min="0" max="9999">
    </div>

    <div class="flex justify-around mb-1">
      {#each $kind as value, identifier}
        <InputRadio required class="h-12" {identifier} checked="{identifier === 0}" group="kind" {value}>
          {value}
        </InputRadio>
      {/each}
    </div>
  </div>

  <label class="flex-col">
    <span>Description</span>
    <textarea class="w-full" placeholder="Optional" name="description" cols="30" rows="2" maxlength="200"></textarea>
  </label>

  <button type="submit" disabled={isLoading} class="mt-2 bg-blue-600 w-full rounded-md p-2 text-white">Save</button>
</form>