import { readFile, writeFile } from "fs/promises";
type CreateState = <State>(
  statePayload: State,
  options?: { persist: boolean }
) => {
  get: () => Promise<State>;
  set: (newState: State) => Promise<void>;
  listen: (cb: (state: State) => void) => void;
};

const createState: CreateState = (statePayload, options) => {
  let state;
  state = statePayload;

  if (options?.persist) {
    writeFile("./src/stores/state.txt", JSON.stringify(state), {}).then(() => {})
  }

  const get = async () => {
    if (options?.persist) {
      try {
        const savedState = await readFile("./src/stores/state.txt", "utf8");
        
        return JSON.parse(savedState);
      } catch (err) {
        return console.error(err);
      }
    }
    
    listen();
    return state;
  };
  
  const set = async (newState) => {
    state = newState;
    
    listen();
    
    if (options?.persist) {
      try {
        await writeFile("./src/stores/state.txt", JSON.stringify(state), {});
      } catch (e) {
        console.log(e);
      }
    }
  };
  
  const listen = (cb?) => {
    return cb && cb(state);
  };
  return {
    get,
    set,
    listen,
  };
};

export { createState };
