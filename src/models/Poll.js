import { v4 as uuid } from "uuid";


export class Option {
  constructor() {
    this.value = "";
    this.votes = 0;
  }
}

export class Poll {
  /**
     * @param {number} nOptions
     */
  constructor(nOptions) {
    this.question = "";
    this.options = Array.from({ length: nOptions }, () => new Option());
    this.id = uuid();
  }

  totalVotes() {
    return this.options.reduce((a, b) => a + b.votes, 0);
  }
}

/**
 * @param {string} question
 * @param {string[]} options
 */
export function dummyPoll(question, options) {
  let poll = new Poll(0);
  poll.question = question;
  options.forEach(o => {
    let option = new Option();
    option.value = o;
    option.votes = Math.floor(Math.random() * 10);
    poll.options.push(option);
  })
  return poll;
}
