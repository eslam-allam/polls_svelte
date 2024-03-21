<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../shared/Button.svelte";
  import { Poll } from "../models/Poll.js";

  let dispatch = createEventDispatcher();

  let nAnswers = 2;
  let poll = new Poll();
  let errors = {};
  let valid = false;

  const submitHandler = () => {
    valid = true;

    if (poll.question.trim().length < 5) {
      valid = false;
      errors.question = "Question must be at least 5 characters long";
    } else {
      errors.question = "";
    }

    if (nAnswers < 2) {
      valid = false;
      errors.general = "Must have at least 2 answers";
    } else {
      errors.general = "";
    }

    for (let i = 0; i < nAnswers; i++) {
      let answerName = `answer-${i}`;
      let answer = poll.options[i];
      if (!answer || answer.trim().length < 1) {
        valid = false;
        errors[answerName] = "Answer cannot be empty";
      } else {
        errors[answerName] = "";
      }
    }

    if (valid) {
      dispatch("newPoll", poll);
      poll = new Poll();
    }
  };
</script>

<main>
  <form on:submit|preventDefault={submitHandler}>
    <div class="error">{errors.general ? errors.general : ""}</div>
    <div class="form-field">
      <label for="question">Poll Question:</label>
      <input
        type="text"
        id="question"
        class:invalid={errors.question}
        bind:value={poll.question}
      />
      <div class="error">{errors.question ? errors.question : ""}</div>
    </div>
    {#each { length: nAnswers } as _, i}
      <div class="form-field">
        <label for="answer-{i}">Answer {i + 1}:</label>
        <input
          type="text"
          id="answer-{i}"
          class:invalid={errors[`answer-${i}`]}
          bind:value={poll.options[i]}
        />

        <div class="remove">
          <Button
            onClick={(e) => {
              e.preventDefault();
              nAnswers--;
              poll.options = poll.options
                .slice(0, i)
                .concat(poll.options.slice(i + 1, poll.options.length));
            }}>Remove Answer</Button
          >
        </div>
        <div class="error">
          {errors[`answer-${i}`] ? errors[`answer-${i}`] : ""}
        </div>
      </div>
    {/each}

    <div class="form-buttons">
      <Button
        type="secondary"
        flat={true}
        onClick={(e) => {
          e.preventDefault();
          nAnswers++;
        }}>Add Answer</Button
      >
      <Button type="secondary" flat={true}>Add Poll</Button>
    </div>
  </form>
</main>

<style>
  main::-webkit-scrollbar {
    width: 5px;
  }

  main::-webkit-scrollbar-track {
    background: #d91b42;
    border-radius: 10px;
  }
  main::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
  }

  main {
    height: 100%;
    width: 550px;
    margin: 0 auto;
    flex: 1;
    overflow-y: auto;
  }
  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  .form-field {
    margin: 18px auto;
  }

  input {
    width: 100%;
    border-radius: 6px;
  }

  label {
    display: block;
    text-align: left;
  }

  div {
    margin: 10px auto;
  }

  .remove {
    text-align: left;
  }

  input[type="text"] {
    height: 40px;
    outline-color: #45c496;
  }

  .invalid {
    border-color: #d91b42;
  }

  .error {
    font-weight: bold;
    font-size: 12px;
    color: #d91b42;
  }

  .form-buttons {
    margin-top: 2em;
  }
</style>
