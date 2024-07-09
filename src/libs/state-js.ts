type CreateState = <State>(state: State, options?: { persist: boolean; }) => {
  get: () => State,
  set: (newState: any) => void,
  listen: (cb: (state: State) => void) => void
}


const 
createState: CreateState = (statePayload, options) => {

  let state;
  state = statePayload

  
  const get = () => {
    let savedState
    return options?.persist ? savedState : state 
  }

  const set = (newState) => {
    
    state = newState

    listen()

    options?.persist
  }


  const listen = (cb?) => {

    cb && cb(state)
  }
  return {
    get,
    set,
    listen
  }
}

export { createState }
