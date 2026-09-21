import ProductCard from "./ProductCard"

function Productlist({products,onEdit,onDelete}){
  if(products.length===0){
    return <p className="no-products">No products found</p>
  }

  return(
    <div className="product-list">
      {products.map((product)=>(
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default Productlist