<script>
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import PollList from "./components/PollList.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import CreatePollForm from "./components/CreatePollForm.svelte";

  // Tabs
  let items = ["Current Polls", "Add New Poll"];
  let activeItem = "Current Polls";

  const tabChange = (/** @type {{ detail: string; }} */ e) =>
    (activeItem = e.detail);

  const handleAddPoll = () => {
    activeItem = "Current Polls";
  };
</script>

<Header />

<main>
  <Tabs {items} {activeItem} on:tabChange={tabChange} />
  {#if activeItem === "Current Polls"}
    <PollList />
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
