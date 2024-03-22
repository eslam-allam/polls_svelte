<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../shared/Button.svelte";
  import { Poll, Option } from "../models/Poll.js";

  let dispatch = createEventDispatcher();

  let nOptions = 2;
  let poll = new Poll(nOptions);
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

    if (nOptions < 2) {
      valid = false;
      errors.general = "Must have at least 2 options";
    } else {
      errors.general = "";
    }

    for (let i = 0; i < nOptions; i++) {
      let optionName = `option-${i}`;
      let option = poll.options[i];
      if (!option || !option.value || option.value.trim().length < 1) {
        valid = false;
        errors[optionName] = "Option cannot be empty";
      } else {
        errors[optionName] = "";
      }
    }

    if (valid) {
      dispatch("add", poll);
      poll = new Poll(nOptions);
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
    {#each poll.options as option, i (option.id)}
      <div class="form-field">
        <label for="option-{i}">Option {i + 1}:</label>
        <input
          type="text"
          id="option-{i}"
          class:invalid={errors[`option-${i}`]}
          bind:value={poll.options[i].value}
        />

        <div class="remove">
          <Button
            onClick={(e) => {
              e.preventDefault();
              nOptions--;
              poll.options = poll.options
                .slice(0, i)
                .concat(poll.options.slice(i + 1, poll.options.length));
            }}>Remove option</Button
          >
        </div>
        <div class="error">
          {errors[`option-${i}`] ? errors[`option-${i}`] : ""}
        </div>
      </div>
    {/each}

    <div class="form-buttons">
      <Button
        type="secondary"
        flat={true}
        onClick={(e) => {
          e.preventDefault();
          nOptions++;
          poll.options.push(new Option());
        }}>Add option</Button
      >
      <Button type="secondary" flat={true}>Add Poll</Button>
    </div>
  </form>
</main>

<style>
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
