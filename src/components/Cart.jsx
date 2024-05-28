import { useDispatch, useSelector } from 'react-redux'
import productList from '../data/productList.json'
import '../styles/cart.scss'
import cartSlice from '../data/cartSlice'

const Cart = () => {
  const { cartProductIds } = useSelector((state) => state.cart)
  const cartProuductData = productList.products.filter((product) => cartProductIds.includes(product.id))

  const { removeFromCart, clearAllItems } = cartSlice.actions;
  const dispatch = useDispatch()
  return (
    <div className="cart">
      {cartProuductData.length > 0 && (<div className="cart-product">
        <h3 className="header">Items in cart</h3>
        <div className="row">
          {cartProuductData.map((product) => (
            <div key={product.id} className="col-md-4 mb-10">
              <img className="item-image" src={product.imageUrl} alt="product" />

              <div className="item-info">
                <h4>{product.name}</h4>
                <p className="text-truncate">{product.detail}</p>
                <button className="btn btn-primary" onClick={() => dispatch(removeFromCart(product.id))}>
                  <i className="bi bi-trash-fill" /> Remove Item
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" onClick={() => dispatch(clearAllItems())}>CHECKOUT</button>
        </footer>
      </div>)}

      {cartProuductData.length < 1 && (<div className="text-center empty-cart">
        <i className="bi bi-cart3" />
        <p>Your cart is empty.</p>
        <p>You have not added any item to your cart.</p>
      </div>)}
    </div>
  )
}

export default Cart
