import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

function Cart() {
  const navigate = useNavigate();
  const {
    items,
    loading,
    error,
    cartCount,
    subtotal,
    fetchCart,
    updateQuantity,
    removeItem,
  } = useCart();
  const [actionError, setActionError] = useState("");

  // Always fetch fresh on page open, so latest price and stock show up
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdate = async (productId, quantity) => {
    setActionError("");
    try {
      await updateQuantity(productId, quantity);
    } catch (err) {
      setActionError(err.message || "Could not update quantity.");
    }
  };

  const handleRemove = async (productId) => {
    setActionError("");
    try {
      await removeItem(productId);
    } catch (err) {
      setActionError(err.message || "Could not remove item.");
    }
  };

  // Skip rows whose product was deleted from the database
  const validItems = items.filter((item) => item.product);

  return (
    <div>
      <Navbar />
      <div className="products-content">
        <h2>My Cart</h2>

        {loading && <p>Loading your cart...</p>}

        {!loading && error && validItems.length === 0 && (
          <div>
            <p>Unable to load your cart.</p>
            <button onClick={fetchCart}>Try Again</button>
          </div>
        )}

        {!loading && !error && validItems.length === 0 && (
          <div className="empty-wishlist">
            <p>Your cart is empty 🛒</p>
            <p>Looks like you haven't added anything yet.</p>
            <button onClick={() => navigate("/products")}>Browse Products</button>
          </div>
        )}

        {!loading && validItems.length > 0 && (
          <div className="cart-layout">
            <div className="cart-items">
              {actionError && <p className="cart-error">{actionError}</p>}
              {validItems.map((item) => (
                <div className="cart-item" key={item.product._id}>
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="cart-item-info">
                    <h3>{item.product.name}</h3>
                    <p className="product-price">
                      ₹{item.product.price.toLocaleString("en-IN")}
                    </p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleUpdate(item.product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdate(item.product._id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="cart-line-total">
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <p>Items: {cartCount}</p>
              <p>Subtotal: ₹{subtotal.toLocaleString("en-IN")}</p>
              <button onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;