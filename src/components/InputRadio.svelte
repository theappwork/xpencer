<script lang="ts">
  export let group: string;
  export let identifier: any;
  export let value: any;
  export let checked = false;
  export let required = false;
  export {clazz as class};

  let clazz: any;
</script>

<input id="{group}_{identifier}" {checked} {required} class="hidden" name={group} type="radio" {value}>
<label for="{group}_{identifier}" role="button" class="p-2 flex text-lg items-center justify-center font-semibold {clazz}">
  <slot/>
</label>