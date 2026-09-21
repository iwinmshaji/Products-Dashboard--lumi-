function ProductCard({product,onEdit,onDelete}){
  function imageError(e){
    e.target.src="https://via.placeholder.com/300x200?text=No+Image"
  }

  return(
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        onError={imageError}
      />

      <div className="product-info">
        <h3>{product.title}</h3>
        <p>₹{product.price}</p>

        <div className="card-buttons">
          <button className="edit-btn" onClick={()=>onEdit(product)}>
            Edit
          </button>

          <button className="delete-btn" onClick={()=>onDelete(product.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard