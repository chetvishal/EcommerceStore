import React from 'react';
import './card.css';
import { useDataContext } from '../../context/cartContextProvider';

export const CartCard = (props) => {

    const { dispatch, updateServer } = useDataContext();

    return (
        <div className="cart-card">
            <div className="cart-image">
                <img src={props.data.image} alt="" />
                <div>
                    <button
                        onClick={() => {
                            updateServer('INCREASE_CART_QTY', props.data)
                        }}
                        className="cart-qty-btn"
                    >+</button>
                    <span className="cart-qty"> {props.data.qty} </span>
                    <button
                        onClick={() => {
                            props.data.qty === 1 ?
                                updateServer('REMOVE_FROM_CART', props.data) :
                                updateServer('DECREASE_CART_QTY', props.data)
                        }}
                        className="cart-qty-btn"
                    >-</button>
                </div>
            </div>
            <div className="cart-details">
                <span className="cart-item-title">{props.data.name}</span>
                <p>
                    <span style={{ fontWeight: "bold" }}>₹{props.data.price} </span>
                    <span className="util-gray-text" style={{ fontSize: "1rem" }}> {props.data.offer}</span>
                    <span style={{ display: "block" }}>{props.data.fastDelivery ? "Fast Delivery" : "Fast Delivery not Available"}</span>
                    <span style={{ display: "block", color: props.data.inStock ? 'green' : 'red', fontWeight: "bolder" }}>{props.data.inStock ? "In Stock" : "Out of stock"}</span>
                </p>
            </div>
        </div>
    )
}