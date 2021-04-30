import { useDataContext } from '../../context/cartContextProvider';
import { CartCard } from '../../components/index';
import "./Cart.css";
import { ShoppingCart } from '../../assets/index';

export const Cart = () => {

    const { state } = useDataContext();
    const { cart, products } = state;

    let cartVal = 0;

    const checkItemInCart = (itemArr) => {
        return itemArr.map(item => {
            const findItem = cart.find(cartItem => cartItem._id === item._id)
            return findItem ?
                {
                    ...item,
                    inCart: true,
                    qty: findItem.qty
                } : item;
        })
    }
    const cartList = checkItemInCart(products);
    cartVal = cartList.reduce((acc, cur) => {
        return cur.inCart ? acc + (cur.price * cur.qty) : acc + 0;
    }, 0)


    return (
        <div className="cartComponent">
            <span className="util-heading-medium">{state.cart.length ? 
                <div className="cart-heading">
                    CART 
                    <ShoppingCart style={{width: "2rem", marginLeft: "1rem"}}/>
                </div> :
                <div className="cart-heading">
                    CART IS EMPTY
                    <ShoppingCart style={{width: "2rem", marginLeft: "1rem"}}/>
                </div>
            }</span>
            <div className="cart">
                <div className="cartList">
                    {cartList.map(i => {
                        return i.inCart ? <CartCard key={i._id} data={i} /> : null
                    })}
                </div>
                <div className="cartDetails" style={{ display: state.cart.length ? 'block' : 'none' }}>
                    <div className="cartDetailCard">
                        <div className="cartDetailSection">
                            <span className="cart-detail-heading">Total Price ({state.cart.length} items)</span>
                            <span className="cart-detail-value">₹{cartVal}</span>
                        </div>
                        <div className="cartDetailSection">
                            <span className="cart-detail-heading">Delivery Charges</span>
                            <span className="cart-detail-value">₹0.00</span>
                        </div>
                        <hr />
                        <div className="cartDetailSection">
                            <span className="cart-detail-heading">Grand Total</span>
                            <span className="cart-detail-value">₹{cartVal}</span>
                        </div>
                        <button className="order-btn">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}