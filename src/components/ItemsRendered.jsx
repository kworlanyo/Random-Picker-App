/* eslint-disable react/prop-types */
import { useContext } from "react";
import { RandomPickerContext } from "../context/RandomPickerContext";

function ItemsRendered({ itemObj }) {
  const { handleDelete } = useContext(RandomPickerContext);

  return (
    <p key={itemObj.id}>
      {itemObj.name} <span onClick={() => handleDelete(itemObj.id)}>X</span>
    </p>
  );
}

export default ItemsRendered;
