type CreateState = <State>(
  statePayload: State,
  options?: { persist: boolean }
) => {
  get: () => State;
  set: (newState: State) => void;
  listen: (cb: (state: State) => void) => void;
};

const createState: CreateState = (state) => {
  const get =  () => {
    listen();
    return state;
  };

  const set =  (newState) => {
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
