type CreateState = <State>(
  statePayload: State,
  options?: { persist: boolean }
) => {
  get: () => Promise<State>;
  set: (newState: State) => Promise<void>;
  listen: (cb: (state: State) => void) => void;
};

const createState: CreateState = (state) => {
  const get = async () => {
    listen();
    return state;
  };

  const set = async (newState) => {
    state = newState;

    listen();
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
