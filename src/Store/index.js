import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      console.log(action.payload.item);
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id == action.payload.item.id
      );
      if (existingCartItemIndex >= 0) {
        state.items[existingCartItemIndex].amount += 1;
      } else {
        let comingItem = action.payload.item;
        comingItem.amount = 1;
        state.items.push(comingItem);
      }
      state.totalAmount = state.totalAmount + action.payload.item.price;
    },
    removeItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id == action.payload
      );
      const existingItem = state.items[existingCartItemIndex];
      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== existingItem.id);
      } else {
        state.items[existingCartItemIndex].amount -= 1;
      }
      state.totalAmount = state.totalAmount - existingItem.price;
    },
    removeWholeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearState(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

const store = configureStore({
  reducer: cartSlice.reducer,
});

export const cartActions = cartSlice.actions;

export default store;
