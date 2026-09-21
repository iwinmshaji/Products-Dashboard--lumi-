import {configureStore} from "@reduxjs/toolkit"
import productReducer from "../feature/ProductSlice"

const store=configureStore({
  reducer:{
    products:productReducer
  }
})

export default store