/* eslint-disable react/jsx-key */
import { useEffect, useContext } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Form from "./Form";
import ItemsRendered from "./ItemsRendered";
import { RandomPickerContext } from "../context/RandomPickerContext";

function RandomPicker() {
  const { state, dispatch, handleCloseModal, modalContent, handlePlay, handleReset, open } =
    useContext(RandomPickerContext);

  useEffect(() => {
    if (state.isPlaying) {
      const intervalId = setInterval(() => {
        dispatch({ type: "PICK" });
        dispatch({ type: "PICK-GIF" });
      });

      const time = setTimeout(() => {
        clearInterval(intervalId);
        dispatch({ type: "PLAY" });
      }, 2000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(time);
      };
    }
  }, [state.isPlaying, dispatch]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <div className="container">
      <Modal classNames={{ modal: "customModal" }} open={open} onClose={handleCloseModal} center>
        {modalContent}
      </Modal>
      <h1>Random Picker</h1>
      <h2>{state.pickedUp?.name || "Add items and pick one"}</h2>
      <Form />
      <div className="names-container">
        {state.items.map((itemObj) => (
          <ItemsRendered itemObj={itemObj} key={itemObj.id} />
        ))}
      </div>
      <div className="buttons-container">
        <button disabled={state.isPlaying} onClick={handlePlay}>
          {state.isPlaying ? "Playing..." : "Play"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="image-container">
        {state.pickedUpGif ? (
          <img src={state.pickedUpGif} alt="gif" />
        ) : (
          <img
            src="https://media4.giphy.com/media/duNowzaVje6Di3hnOu/200.webp?cid=790b7611m1pq09ou96exzpi41wbs0hgyrt34acpn0zhwgc4b&ep=v1_gifs_trending&rid=200.webp&ct=g"
            alt="gif"
          />
        )}
      </div>
    </div>
  );
}

export default RandomPicker;
