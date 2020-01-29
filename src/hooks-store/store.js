import {useState, useEffect} from 'react';

let globalState = {};
let listeners = [];
let actions = {};


export const useStore = (shouldListen = true) => { //custom react hook (just a function)
    // here we are adding a setState to a component that uses this hook when the components mounts and removing it when the component unmounts
    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier, payload) => { // function that allows us to dispatch an action from the component to alter the state
        const newState = actions[actionIdentifier](globalState, payload); //get the new state using function in the actions object

        globalState = { //merge the new state with the old state
            ...globalState,
            ...newState
        };

        for (const listener of listeners) { //update the state on every component (listener)
            listener(globalState)
        }
    }

    useEffect(()=>{ //this will run whenever a component that uses this hook updates
        if(shouldListen){
            listeners.push(setState);
            return () => {
                listeners = listeners.filter(listener => listener !== setState); //clear listeners that
            }
        }        
    },[setState, shouldListen]);


    return [globalState, dispatch];
}


export const initStore = (userActions, initialState) => {
    if(initialState){ //if there is an initial state
        globalState = { ...globalState, ...initialState}
    }

    actions = {...actions, ...userActions};
}