import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../services/api";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [wishlistState, setWishlistState] = useState("default");

  const handleAddToWishlist = async () => {

    //prevent duplicate requests
    if (wishlistState === "saving" || wishlistState === "success") return;

    setWishlistState("saving");
    try {
      await addToWishlist(product._id);
      setWishlistState("success");
    } catch (err) {
      setWishlistState("error");
    }
  };

  const wishlistLabel = {
    default: "♡ Add to Wishlist",
    saving: "⏳ Saving...",
    success: "♥ Added to Wishlist",
    error: "Unable to save. Try again.",
  }[wishlistState];

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>
      <p className="product-stock">
        {product.stock > 0 ? `${product.stock} units left` : "Out of stock"}
      </p>
      <button onClick={() => navigate(`/products/${product._id}`)}>
        View Details
      </button>
      <button onClick={handleAddToWishlist} disabled={wishlistState === "saving"}>
        {wishlistLabel}
      </button>
    </div>
  );
}

export default ProductCard;