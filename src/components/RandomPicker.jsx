import { useEffect, useReducer } from "react";
import { useState } from "react";

// items is a state with initial value being an empty array
const initialState = {
  items: [],
  isPlaying: false,
};

// Action is an object, one property is type, another property is payload
function reducer(currentState, action) {
  switch (action.type) {
    case "ADD": {
      return {
        ...currentState,
        items: [...currentState.items, action.payload],
      };
    }
    case "DELETE": {
      return {
        ...currentState,
        items: currentState.items.filter((itemObj) => itemObj.id !== action.payload),
      };
    }
    case "PLAY": {
      return {
        ...currentState,
        isPlaying: !currentState.isPlaying,
      };
    }

    case "PICK": {
      const randomIndex = Math.floor(Math.random() * currentState.items.length);
      const randomItem = currentState.items[randomIndex];
      return {
        ...currentState,
        pickedUp: randomItem,
      };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return currentState;
  }
}

function RandomPicker() {
  const [input, setInput] = useState("");
  // const [items, setItems] = useState([])
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleAdd(e) {
    e.preventDefault();

    if (input === "") {
      alert("No input. Please add input");
    } else {
      // input Object
      const inputItem = {
        name: input,
        id: Date.now(),
      };

      // Looping through the items array to see if any object in the items array has a name property that is the same as th inputItem name
      const findItem = state.items.find((itemObj) => itemObj.name === inputItem.name);

      if (findItem) {
        alert("Item already exist");
      } else {
        dispatch({ type: "ADD", payload: inputItem });
        setInput("");
      }
    }
  }

  function handleDelete(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  // function handlePickItem(array) {
  //   const randomNumber = Math.floor(Math.random() * array.length);
  //   const randomItem = array[randomNumber];
  //   return randomItem;
  // }

  function handlePlay() {
    if (state.items.length < 2) {
      alert("minimum 2 items required to play");
    } else {
      dispatch({ type: "PLAY" });
    }
  }

  useEffect(() => {
    if (state.isPlaying) {
      const intervalId = setInterval(() => {
        dispatch({ type: "PICK" });
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [state.isPlaying]);

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  return (
    <>
      {/* <h2>Add items and pick one</h2>
      <form>
        <input type="text" placeholder="Add an item here" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </form>
      {state.items.map((itemObj) => (
        <p key={itemObj.id}>
          {itemObj.name} <span onClick={() => handleDelete(itemObj.id)}>X</span>
        </p>
      ))}
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleReset}>Reset</button>
      {state.pickedItem && <p>Picked item: {state.pickedItem.name}</p>} */}
      <h2>Add items and pick one</h2>
      <form>
        <input type="text" placeholder="Add an item here" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </form>
      {state.items.map((itemObj) => (
        <p key={itemObj.id}>
          {itemObj.name} <span onClick={() => handleDelete(itemObj.id)}>X</span>
        </p>
      ))}
      <button disabled={state.isPlaying} onClick={handlePlay}>
        {state.isPlaying ? "Playing..." : "Play"}
      </button>
      <button onClick={handleReset}>Reset</button>
      {state.pickedItem && <p>Picked item: {state.pickedItem.name}</p>}
    </>
  );
}

export default RandomPicker;
