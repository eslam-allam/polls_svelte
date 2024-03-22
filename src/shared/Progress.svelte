<script>
  import { tweened } from "svelte/motion";

  export let value;
  export let total;
  export let type = "primary";
  const makePercentage = (value, total) => { 
    if (total == 0) {
      return 0;
    }
    return Math.floor((100 / total) * value);
  }

  const progress = tweened(0);
  
  $: percentage = makePercentage(value, total);
  $: progress.set(percentage);
</script>

<div
  class="percent"
  style="width: {$progress}%;"
  class:percent-a={type === "primary"}
  class:percent-b={type === "secondary"}
></div>

<style>
  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }

  .percent-a {
    border-left: 4px solid #d91b42;
    background: rgba(217, 27, 66, 0.2);
  }

  .percent-b {
    border-left: 4px solid #45c496;
    background: rgba(69, 196, 150, 0.2);
  }
</style>
