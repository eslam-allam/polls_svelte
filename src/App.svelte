<script>
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import PollList from "./components/PollList.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import CreatePollForm from "./components/CreatePollForm.svelte";
  import { dummyPoll } from "./models/Poll.js";

  // Tabs
  let items = ["Current Polls", "Add New Poll"];
  let activeItem = "Current Polls";

  const tabChange = (/** @type {{ detail: string; }} */ e) =>
    (activeItem = e.detail);

  let polls = [
    dummyPoll("What is love?", ["Baby don't hurt me", "I love you"]),
  ];

  const handleAddPoll = (/** @type {{ detail: import("./models/Poll.js").Poll; }} */ e) => {
    polls = [e.detail, ...polls];
    activeItem = "Current Polls";
    console.log(polls);
  };

  const handleVote = (e) => {
    const {optionId, pollId} = e.detail
    let copiedPolls = [...polls];
    let upvotedPoll = copiedPolls.find((poll) => poll.id === pollId);
    upvotedPoll.options.find((o) => o.id === optionId).votes++;
    polls = copiedPolls;

  }
</script>

<Header />

<main>
  <Tabs {items} {activeItem} on:tabChange={tabChange} />
  {#if activeItem === "Current Polls"}
    <PollList {polls} on:vote={handleVote}/>
  {:else if activeItem === "Add New Poll"}
    <CreatePollForm on:add={handleAddPoll} />
  {/if}
</main>

<Footer />

<style>
  main {
    margin: 40px 2%;
    flex: 1;
    flex-direction: row;
  }
</style>
