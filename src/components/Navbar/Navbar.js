import React from 'react';
import './navbar.css';
import '../CSS/badge.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faSearch, faHome, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../context/cartContextProvider';

export const Navbar = ({ setInput }) => {

    const { state, dispatch } = useDataContext();

    return (
        <header>
            <input type="checkbox" id="nav-toggle" class="nav-toggle" />
            <nav class="navbar">
                <a href="#" class="nav-logo"
                    onClick={() => dispatch({ type: 'SET_ROUTE', payload: "HOME" })}
                >MDAD</a>
                <ul class="nav-list">
                    <li className="search-box">
                        <input type="text" onChange={e => setInput(e.target.value)} className="nav-inputbox" placeholder="Search "
                            placeholder="Search"
                        />
                        <FontAwesomeIcon icon={faSearch} />
                    </li>
                    <li>
                        <a href="#"
                            onClick={() => dispatch({ type: 'SET_ROUTE', payload: "HOME" })}>
                            <span class="icon-badge">
                                <i style={{ fontStyle: "normal" }}>
                                    <FontAwesomeIcon icon={faHome} />
                                    {/* { state.cart.length } */}
                                    <span className="nav-icon-label">Home</span>
                                </i>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            onClick={() => dispatch({ type: 'SET_ROUTE', payload: "CART" })}>
                            <span class="icon-badge">
                                <i style={{ fontStyle: "normal" }}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    {/* { state.cart.length } */}
                                    <span className="nav-icon-label">Cart</span>
                                    <span class="avatar-badge-notification-icon" style={{ display: state.cart.length ? 'inline' : 'none' }}><span className="notification-value">{state.cart.length}</span></span>
                                </i>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            onClick={() => dispatch({ type: 'SET_ROUTE', payload: "WISHLIST" })}>
                            <span class="icon-badge">
                                <i style={{ fontStyle: "normal" }}>
                                    <FontAwesomeIcon icon={faHeart} />
                                    {/* {state.wishList.length } */}
                                    <span className="nav-icon-label">Wishlist</span>
                                    <span class="avatar-badge-notification-icon" style={{ display: state.wishList.length ? 'inline' : 'none' }}><span className="notification-value"> {state.wishList.length}</span></span></i>
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
            <label for="nav-toggle" className="nav-toggle-label">
                <span>
                <FontAwesomeIcon icon={faBars} className="bars" />
                <FontAwesomeIcon icon={faTimes} className="times" />
                </span>
            </label>
        </header>
    )
}