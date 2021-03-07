<script lang="ts">
  export let title: string;
  export let description: string | null = null;
</script>

<div class="flex flex-col">
  <h2 class="md:text-3xl text-2xl font-semibold mb-2">
    {title}
  </h2>
  {#if description}
    <p class="text-gray-400">
      {description}
    </p>
  {/if}
</div>