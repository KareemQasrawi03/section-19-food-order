import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingIndex > -1) {
      const existing = updatedItems[existingIndex];

      const updatedItem = {
        ...existing,
        quantity: existing.quantity + 1,
      };

      updatedItems[existingIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existing = state.items[existingIndex];
    const updatedItems = [...state.items];

    if (existing.quantity === 1) {
      updatedItems.splice(existingIndex, 1);
    } else {
      const updatedItem = {
        ...existing,
        quantity: existing.quantity - 1,
      };
      updatedItems[existingIndex] = updatedItem;
    }

    return { items: updatedItems };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  const value = {
    items: cart.items,
    addItem,
    removeItem,
  };
  console.log(value.items)

  return <CartContext value={value}>{children}</CartContext>;
}

export { CartContext };
