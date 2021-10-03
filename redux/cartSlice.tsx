import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = { cart: { __typename?: 'Checkout' } & CheckoutDetailsFragment | null };

// First approach: define the initial state using that type
const initialState: SliceState = { cart: null };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProfile: (
      state,
      { payload }: PayloadAction<{ __typename?: 'Checkout' } & CheckoutDetailsFragment | null>
    ) => {
      state.cart = payload;
    },
  },
});

export const { setProfile } = cartSlice.actions;

export default cartSlice.reducer;
