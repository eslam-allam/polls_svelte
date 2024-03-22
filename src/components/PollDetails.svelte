<script>
  import PollStore from "../stores/PollStore";
  import Card from "../shared/Card.svelte";
  import Button from "../shared/Button.svelte";
  import Progress from "../shared/Progress.svelte";

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

  const handleDelete = (id) =>
    PollStore.update((currentPolls) =>
      currentPolls.filter((poll) => poll.id != id),
    );
</script>

<Card>
  <div class="poll">
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
        <Progress
          pollId={poll.id}
          optionId={option.id}
          type={i % 2 == 0 ? "primary" : "secondary"}
        ></Progress>
        <span>{option.value} ({option.votes})</span>
      </div>
    {/each}
    <div class="delete">
      <Button flat={true} onClick={() => handleDelete(poll.id)}>Delete</Button>
    </div>
  </div>
</Card>

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

  .delete {
    margin-top: 30px;
    text-align: center;
  }
</style>
