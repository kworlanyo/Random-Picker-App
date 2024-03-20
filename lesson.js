//* useState with forms
// 1. Create the state
// 2. Give the input element a value prop and assign the state variable to it.
// 3a. Have a handler function to change the input and add an onChange prop to the input and reference to the handleChange function like this:
// function handleChange(e){setInput(e.target.value)} or
// 3b. you can directly write an arrow function to the prop like: onChange={(e) => setInput(e.target.value)}

//* using Reducer
// 1. import useReducer from react
// 2. Declare the useReducer then destructure state and dispatch and then add two parameters to the useReducer hook (reducer function, initialState)
// Note that state is the same as the value in initialState.
// Declare the initialState object with its individual state variables as properties
// Write the reducer function with two parameters. The first parameter is the currentState and the second is the action object.
