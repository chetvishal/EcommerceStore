import { useState } from 'react';
import { useDataContext } from '../../context/cartContextProvider';
import { CartCard } from '../Card/CartCard';
import "./Cart.css";

export const Cart = () => {

    const { state } = useDataContext();
    const [price, setPrice] = useState(0);

    let cartVal = 0;
    state.cart.map(i => {
        cartVal = Number(cartVal) + (Number(i.price) * Number(i.qty));
    })


    return (
        <div className="cartComponent">
            <span className="util-heading-medium">{ state.cart.length ? 'CART' : 'CART IS EMPTY'}</span>
            <div className="cart">
                <div className="cartList">
                    {state.cart.map(i => {
                       return <CartCard key={i.id} data={i} />
                    })}
                </div>
                <div className="cartDetails" style={{display: state.cart.length ? 'block' : 'none'}}>
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