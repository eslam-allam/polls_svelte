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
}
