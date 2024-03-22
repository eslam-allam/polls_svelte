<script>
  import {createEventDispatcher} from "svelte";
  import Card from "../shared/Card.svelte";

  const dispatch = createEventDispatcher();
  export let poll;

  const handleVote = (/** @type {number} */ optionId, /** @type {string} */ pollId) => {
    dispatch("vote", {optionId, pollId});
  };
</script>

<Card
  ><div class="poll">
    <h3>{poll.question}</h3>
    <p>Total votes: {poll.totalVotes()}</p>
    {#each poll.options as option, i (option.id)}
      <div class="answer" on:click={() => handleVote(option.id, poll.id)}>
        <div class="percent percent-{i}"></div>
        <span>{option.value} ({option.votes})</span>
      </div>
    {/each}
  </div></Card
>

<style>
  h3 {
    margin: 0;
    color: #555;
  }
  p {
    margin-top: 6px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 30px;
  }

  .answer {
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }
  .answer:hover {
    opacity: 0.6;
  }
  span {
    display: inline-block;
    padding: 10px 20px;
  }
</style>
