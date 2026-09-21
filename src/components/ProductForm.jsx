import {useEffect,useState} from "react"

function ProductForm({editingProduct,onSave,onCancel}){
  const [name,setName]=useState("")
  const [image,setImage]=useState("")
  const [price,setPrice]=useState("")

  useEffect(()=>{
    if(editingProduct){
      setName(editingProduct.title)
      setImage(editingProduct.thumbnail)
      setPrice(editingProduct.price)
    }else{
      setName("")
      setImage("")
      setPrice("")
    }
  },[editingProduct])

  function handleSubmit(e){
    e.preventDefault()

    if(name.trim()===""||image.trim()===""||price===""){
      alert("Please fill all fields")
      return
    }

    const product={
      id:editingProduct?editingProduct.id:Date.now(),
      title:name,
      thumbnail:image,
      price:price
    }

    onSave(product)
    setName("")
    setImage("")
    setPrice("")
  }

  return(
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct?"Update Product":"Add Product"}</h2>

      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e)=>setImage(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <div className="form-buttons">
        <button type="submit">
          {editingProduct?"Update Product":"Add Product"}
        </button>

        {editingProduct&&(
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ProductForm