import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  ingredients: {},
  status: 'idle',
  error: null,
};

export const fetchIngredients = createAsyncThunk('plov/fetchIngredients', async () => {
  const response = await axios.get('http://localhost:3000/ingredients');
  return response.data;
});

export const orderPlov = createAsyncThunk('plov/orderPlov', async (quantity) => {
  const response = await axios.post('http://localhost:3000/order-plov', { quantity });
  return response.data;
});

export const addIngredient = createAsyncThunk('plov/addIngredient', async ({ name, amount }) => {
  const response = await axios.post('http://localhost:3000/add-ingredient', { name, amount });
  return response.data;
});

export const deleteIngredient = createAsyncThunk('plov/deleteIngredient', async (name) => {
  const response = await axios.delete(`http://localhost:3000/ingredient/${name}`);
  return response.data;
});

const plovSlice = createSlice({
  name: 'plov',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(orderPlov.fulfilled, (state, action) => {
        state.ingredients = action.payload.remainingIngredients;
      })
      .addCase(addIngredient.fulfilled, (state, action) => {
        state.ingredients = action.payload.ingredients;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.ingredients = action.payload.ingredients;
      });
  },
});

export default plovSlice.reducer;