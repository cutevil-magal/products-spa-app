import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product';

interface ProductsState {
  items: Product[];
  favorites: number[];
}

const initialState: ProductsState = {
  items: [],
  favorites: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // действия:
    toggleFavorite: (state, action: PayloadAction<number>) => {
      // Добавить/удалить id продукта в favorites
      const productId = action.payload;
      const isFavorite = state.favorites.includes(productId);
      
      if (isFavorite) {
          // Удалить из избранного
          state.favorites = state.favorites.filter(id => id !== productId);
      } else {
          // Добавить в избранное
          state.favorites.push(productId);
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      // Удалить продукт из items
      const productId = action.payload;
      state.favorites = state.favorites.filter(id => id !== productId);
      state.items = state.items.filter(product => product.id !== productId);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      // Добавить продукт в items
      state.items.push(action.payload);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      // Загрузить продукты из API
      state.items = action.payload;
    }
  },
});

export const { toggleFavorite, removeProduct, addProduct, setProducts } = productsSlice.actions;
export default productsSlice.reducer;