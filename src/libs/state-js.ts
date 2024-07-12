import { readFile, writeFile } from "fs/promises";
type CreateState = <State>(
  state: State,
  options?: { persist: boolean }
) => {
  get: () => Promise<State>;
  set: (newState: any) => void;
  listen: (cb: (state: State) => void) => void;
};

const createState: CreateState = (statePayload, options) => {
  let state;
  state = statePayload;

  const get = async () => {
    if (options?.persist) {
      try {
        const savedState = await readFile("./src/stores/state.txt", 'utf8')

        return JSON.parse(savedState)
      }
      catch(err) {
        return console.error(err)
      }
    }

    return state
  };

  const set = (newState) => {
    state = newState;

    listen();

    if (options?.persist) {
      writeFile(
        "./src/stores/state.txt",
        JSON.stringify(newState),
        {}
      )
      .then(() => {})
      .catch(err => console.log(err))
    }
      
  };

  const listen = (cb?) => {
    cb && cb(state);
  };
  return {
    get,
    set,
    listen,
  };
};

export { createState };
