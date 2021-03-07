<script lang="ts">
  import { onMount } from 'svelte';
  import SectionHeader from './components/sections/SectionHeader.svelte';
  import SectionAccount from './components/sections/SectionAccount.svelte';
  import SectionHistory from './components/sections/SectionHistory.svelte';
  import SectionAdd from './components/sections/SectionAdd.svelte';
  import { auth } from './stores/auth';
  import { options, sheet, spreadsheet } from './stores/data';
  import { DEFAULT_ACCOUNT, fetchBaseLists, getOrCreateSpreadsheet, getSheet, initClient } from './App';

  auth.subscribe(async (isSignedIn) => {
    spreadsheet.clear();

    if (isSignedIn) {
      const spreadsheetId = await getOrCreateSpreadsheet();
      const { accounts } = await fetchBaseLists(spreadsheetId);
      const currentYear = new Date().getFullYear();
      const defaultAccount = !accounts || !accounts.length ? DEFAULT_ACCOUNT : accounts[0];
      const defaultSheet = `${currentYear}-${defaultAccount}`;

      spreadsheet.set({
        id: spreadsheetId,
        sheet: defaultSheet
      })
    }
  });

  spreadsheet.subscribe(async state => {
    if (!state.id || !state.sheet) {
      sheet.clear();
      options.clear();
      return;
    }

    const data = await getSheet(state.id, state.sheet);
    sheet.setData(state.sheet, data);
  })

  onMount(initClient);
</script>

<main class="h-full flex flex-col">
  <header class="md:px-4 h-16 flex flex-row items-center justify-end text-sm">
    <SectionHeader/>
  </header>

  <div class="md:px-4 flex-1 flex flex-col pb-2">
    <section>
      <SectionAccount/>
    </section>

    <section class="my-2">
      <SectionHistory/>
    </section>

    <section class="flex-1">
      <SectionAdd/>
    </section>
  </div>
</main>