import { configureStore } from "@reduxjs/toolkit";
import productDetails from "../features/productDetails";

export const store = configureStore({
  reducer: {
    app: productDetails,
  },
});
