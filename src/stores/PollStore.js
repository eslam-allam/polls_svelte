import { writable } from "svelte/store";
import { dummyPoll } from "../models/Poll";


const PollStore = writable([
    dummyPoll("What is love?", ["Baby don't hurt me", "I love you"]),
])


export default PollStore;
