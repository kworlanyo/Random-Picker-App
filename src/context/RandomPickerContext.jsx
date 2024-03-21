/* eslint-disable react/prop-types */
import { createContext, useReducer, useState } from "react";

export const RandomPickerContext = createContext();

// items is a state with initial value being an empty array
const initialState = {
  items: JSON.parse(localStorage.getItem("items")) || [],
  isPlaying: false,
  pickedUp: null,
  gifImages: [
    "https://media2.giphy.com/media/ljuSksqL9j0yI/giphy.webp?cid=82a1493bt8gyawk94mn7knxt6b7rk4j8fyewuyh8t1m2sw8t&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
    "https://media4.giphy.com/media/67ThRZlYBvibtdF9JH/200.webp?cid=82a1493bt8gyawk94mn7knxt6b7rk4j8fyewuyh8t1m2sw8t&ep=v1_gifs_trending&rid=200.webp&ct=g",
    "https://media2.giphy.com/media/VIPdgcooFJHtC/200.webp?cid=82a1493bt8gyawk94mn7knxt6b7rk4j8fyewuyh8t1m2sw8t&ep=v1_gifs_trending&rid=200.webp&ct=g",
    "https://media0.giphy.com/media/3oxHQDdV1D2zZ3ADG8/giphy.webp?cid=82a1493boka5vqhdqrgghg3fzmxl0lz87tdml51649402zrj&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
    "https://media4.giphy.com/media/EUYEQQxQsOInrMAD8M/giphy.webp?cid=790b7611m1pq09ou96exzpi41wbs0hgyrt34acpn0zhwgc4b&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
    "https://media1.giphy.com/media/J6fjW4xvv2T2uPgk8M/giphy.webp?cid=82a1493b8wnqb6q9dg4n3p2zxto02hl6mt8s46dmtzeayq46&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
    "https://media4.giphy.com/media/ywmoTiRyU43iU/giphy.webp?cid=82a1493bs1o5s3ns1pttl2zww2zc985pgrq9441kvtkr8bhr&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
    "https://media4.giphy.com/media/pynZagVcYxVUk/giphy.webp?cid=82a1493bs1o5s3ns1pttl2zww2zc985pgrq9441kvtkr8bhr&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
    "https://media0.giphy.com/media/2bUpP71bbVnZ3x7lgQ/200.webp?cid=82a1493b6svb4fzceq97cn2hxorv8wbt6wseurm489jj9w1i&ep=v1_gifs_trending&rid=200.webp&ct=g",
  ],
  pickedUpGif: null,
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

    case "PICK-GIF": {
      const randomIndex = Math.floor(Math.random() * currentState.gifImages.length);
      const randomGif = currentState.gifImages[randomIndex];
      return {
        ...currentState,
        pickedUpGif: randomGif,
      };
    }

    case "RESET": {
      return { ...initialState, items: [] };
    }
    default:
      return currentState;
  }
}

function RandomPickerContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  function handleDelete(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function handlePlay() {
    if (state.items.length < 2) {
      handleOpenModal();
      setModalContent("minimum 2 items required to play");
    } else {
      dispatch({ type: "PLAY" });
    }
  }

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  return (
    <RandomPickerContext.Provider
      value={{
        state,
        dispatch,
        handleDelete,
        open,
        setModalContent,
        handleCloseModal,
        handleOpenModal,
        handlePlay,
        modalContent,
        handleReset,
      }}
    >
      {children}
    </RandomPickerContext.Provider>
  );
}

export default RandomPickerContextProvider;
