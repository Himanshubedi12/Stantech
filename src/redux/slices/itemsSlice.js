import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    list: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.list = action.payload;
    },
    addItem: (state, action) => {
      state.list.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.list.findIndex(item => item.id === action.payload.id);
      state.list[index] = action.payload;
    },
    deleteItem: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
  },
});

export const { setItems, addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
