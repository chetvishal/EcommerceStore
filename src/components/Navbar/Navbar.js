import React from 'react';
import './navbar.css';
import '../CSS/badge.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faSearch, faHome, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../context/cartContextProvider';
import { Link } from 'react-router-dom';

export const Navbar = ({ setInput }) => {

    const { state, dispatch } = useDataContext();

    return (
        <header>
            <input type="checkbox" id="nav-toggle" class="nav-toggle" />
            <nav class="navbar">
                <a href="#" class="nav-logo"
                ><Link to="/">NEXT STORE</Link></a>
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
                            <Link to="/">
                                <span class="icon-badge">
                                    <i style={{ fontStyle: "normal" }}>
                                        <FontAwesomeIcon icon={faHome} />
                                        <span className="nav-icon-label">Home</span>
                                    </i>
                                </span>
                            </Link>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            onClick={() => dispatch({ type: 'SET_ROUTE', payload: "CART" })}>
                            <Link to="cart">
                                <span class="icon-badge">
                                    <i style={{ fontStyle: "normal" }}>
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                        <span className="nav-icon-label">Cart</span>
                                        <span class="avatar-badge-notification-icon" style={{ display: state.cart.length ? 'inline' : 'none' }}><span className="notification-value">{state.cart.length}</span></span>
                                    </i>
                                </span>
                            </Link>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            onClick={() => dispatch({ type: 'SET_ROUTE', payload: "WISHLIST" })}>
                            <Link to="wishlist">
                                <span class="icon-badge">
                                    <i style={{ fontStyle: "normal" }}>
                                        <FontAwesomeIcon icon={faHeart} />
                                        {/* {state.wishList.length } */}
                                        <span className="nav-icon-label">Wishlist</span>
                                        <span class="avatar-badge-notification-icon" style={{ display: state.wishList.length ? 'inline' : 'none' }}><span className="notification-value"> {state.wishList.length}</span></span></i>
                                </span>
                            </Link>
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