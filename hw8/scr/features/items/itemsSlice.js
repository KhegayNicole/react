import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { itemsService } from '../../services/itemsService.js'

// Async thunk для загрузки списка товаров
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (query = '', { rejectWithValue }) => {
    try {
      const data = await itemsService.getAll(query)
      return { products: data.products || [], query }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch items')
    }
  }
)

// Async thunk для загрузки одного товара по ID
export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await itemsService.getById(id)
      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch item')
    }
  }
)

const initialState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: '',
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearSelectedItem: (state) => {
      state.selectedItem = null
      state.errorItem = null
    },
  },
  extraReducers: (builder) => {
    // Обработка fetchItems
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true
        state.errorList = null
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false
        state.list = action.payload.products
        state.query = action.payload.query
        state.errorList = null
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false
        state.errorList = action.payload
        state.list = []
      })

    // Обработка fetchItemById
    builder
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true
        state.errorItem = null
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false
        state.selectedItem = action.payload
        state.errorItem = null
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false
        state.errorItem = action.payload
        state.selectedItem = null
      })
  },
})

export const { clearSelectedItem } = itemsSlice.actions
export default itemsSlice.reducer

