import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"

export const fetchProducts=createAsyncThunk("products/fetchProducts",async()=>{
  const response=await fetch("https://dummyjson.com/products")

  if(!response.ok){
    throw new Error("Products could not load")
  }

  const data=await response.json()
  return data.products
})

const productSlice=createSlice({
  name:"products",
  initialState:{
    products:[],
    loading:false,
    error:""
  },
  reducers:{
    addProduct:(state,action)=>{
      state.products.unshift(action.payload)
    },

    deleteProduct:(state,action)=>{
      state.products=state.products.filter((product)=>product.id!==action.payload)
    },

    updateProduct:(state,action)=>{
      state.products=state.products.map((product)=>{
        if(product.id===action.payload.id){
          return action.payload
        }

        return product
      })
    }
  },

  extraReducers:(builder)=>{
    builder
      .addCase(fetchProducts.pending,(state)=>{
        state.loading=true
        state.error=""
      })
      .addCase(fetchProducts.fulfilled,(state,action)=>{
        state.loading=false
        state.products=action.payload
      })
      .addCase(fetchProducts.rejected,(state,action)=>{
        state.loading=false
        state.error=action.error.message
      })
  }
})

export const {addProduct,deleteProduct,updateProduct}=productSlice.actions

export default productSlice.reducer