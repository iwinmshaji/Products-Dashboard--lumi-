import {useEffect,useState} from "react"
import {useDispatch,useSelector} from "react-redux"
import ProductForm from "./components/ProductForm"
import Productlist from "./components/ProductList"
import SearchBar from "./components/SearchBar"
import {addProduct,deleteProduct,fetchProducts,updateProduct} from "./feature/ProductSlice"
import "./App.css"

function App(){
  const dispatch=useDispatch()
  const {products,loading,error}=useSelector((state)=>state.products)
  const [search,setSearch]=useState("")
  const [editingProduct,setEditingProduct]=useState(null)

  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])

  const filteredProducts=products.filter((product)=>{
    return product.title.toLowerCase().includes(search.toLowerCase())
  })

  function saveProduct(product){
    if(editingProduct){
      dispatch(updateProduct(product))
      setEditingProduct(null)
    }else{
      dispatch(addProduct(product))
    }
  }

  function cancelEdit(){
    setEditingProduct(null)
  }

  return(
    <main className="app">
      <section className="dashboard">
        <h1>Products Dashboard</h1>

        <ProductForm
          editingProduct={editingProduct}
          onSave={saveProduct}
          onCancel={cancelEdit}
        />

        <SearchBar search={search} setSearch={setSearch}/>

        {loading&&<p className="message">Loading products...</p>}

        {error&&<p className="error-message">{error}</p>}

        {!loading&&!error&&(
          <Productlist
            products={filteredProducts}
            onEdit={setEditingProduct}
            onDelete={(id)=>dispatch(deleteProduct(id))}
          />
        )}
      </section>
    </main>
  )
}

export default App