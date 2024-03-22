<script>
  import PollStore from "../stores/PollStore";
  import Card from "../shared/Card.svelte";

  export let poll;

  const handleVote = (
    /** @type {number} */ optionId,
    /** @type {string} */ pollId,
  ) => {
    PollStore.update((currentPolls) => {
      let copiedPolls = [...currentPolls];
      let upvotedPoll = copiedPolls.find((poll) => poll.id === pollId);
      upvotedPoll.options.find((o) => o.id === optionId).votes++;
      return copiedPolls;
    });
  };
</script>

<Card
  ><div class="poll">
    <h3>{poll.question}</h3>
    <p>Total votes: {poll.totalVotes()}</p>
    {#each poll.options as option, i (option.id)}
      <div
        role="button"
        tabindex="0"
        class="answer"
        on:click={() => handleVote(option.id, poll.id)}
        on:keydown={() => handleVote(option.id, poll.id)}
      >
        <div
          class="percent"
          style="width: {Math.floor(
            (100 / poll.totalVotes()) * option.votes,
          )}%;"
          class:percent-a={i % 2 == 0}
          class:percent-b={i % 2 == 1}
        ></div>
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
