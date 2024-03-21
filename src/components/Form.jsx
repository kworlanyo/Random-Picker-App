/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { RandomPickerContext } from "../context/RandomPickerContext";

function Form() {
  const [input, setInput] = useState("");
  const { state, dispatch, handleOpenModal, setModalContent } = useContext(RandomPickerContext);

  function handleAdd(e) {
    e.preventDefault();

    if (input === "") {
      handleOpenModal();
      setModalContent("No input. Please add input");
    } else {
      // input Object
      const inputItem = {
        name: input,
        id: Date.now(),
      };

      // Looping through the items array to see if any object in the items array has a name property that is the same as th inputItem name
      const findItem = state.items.find((itemObj) => itemObj.name === inputItem.name);

      if (findItem) {
        handleOpenModal();
        setModalContent("Item already exist");
      } else {
        dispatch({ type: "ADD", payload: inputItem });
        setInput("");
      }
    }
  }

  return (
    <form>
      <input type="text" placeholder="Add an item here" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </form>
  );
}

export default Form;
