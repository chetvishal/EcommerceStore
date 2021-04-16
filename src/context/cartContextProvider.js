import { createContext, useContext, useReducer, useEffect } from 'react';
import { reducerFunction } from './reducerFunction';
import axios from 'axios';

const dataContext = createContext();

export const useDataContext = () => useContext(dataContext);

export const CartContextProvider = ({ children }) => {
    useEffect(() => {
        async function getData() {

            await axios.get('/api/products').then((resp) => {
                // console.log('from context', resp.data.products)
                dispatch({ type: 'ADD_PRODUCTS_FROM_SERVER', payload: resp.data.products });
            }).catch(err => alert('failed to fetch data from server: ', err));

            await axios.get('/api/wishLists').then((resp) => {
                // console.log(resp.data.wishLists)
                dispatch({ type: 'ADD_CART_FROM_SERVER', payload: resp.data.wishLists });
            }).catch(err => console.log(err));

            await axios.get('/api/cartLists').then((resp) => {
                // console.log(resp.data.cartLists)
                dispatch({ type: 'ADD_WISHLIST_FROM_SERVER', payload: resp.data.cartLists });
            }).catch(err => alert('failed to fetch data from server: (cartList)', err));

        }
        getData();
    }, []);

    const fetchResource = async () => {
        await axios.get('/api/wishLists')
            .then(resp => console.log(resp))
            .catch(err => console.log('error while fetching resources: ', err))
    }

    const removeToast = () => {
        setTimeout(()=>{
            dispatch({ type: 'SET_TOAST', payload:{visible: false, text: ""}  })
        }, 5000)
    }

    const updateServer = async (action, payload) => {
        switch (action) {
            case 'ADD_TO_CART': {
                await axios.post('/api/cartLists', {
                    cartList: { ...payload, qty: 1 }
                }).then(response => {
                    // console.log("from cart context provider", response)
                    dispatch({ type: 'ADD_TO_CART', payload: response.data.cartList })
                    dispatch({ type: 'SET_TOAST', payload:{visible: true, text: "Successfully added"}  })
                    removeToast();
                }).catch(error => {
                    console.log("from cart context provider", error)
                })
                break;
            }
            case 'REMOVE_FROM_CART': {
                await axios.delete(`/api/cartLists/${payload.id}`).then(response => {
                    console.log(response);
                    dispatch({ type: 'REMOVE_FROM_CART', payload: payload });
                    dispatch({ type: 'SET_TOAST', payload:{visible: true, text: "Successfully Removed"}  })
                    removeToast();
                }).catch(error => console.log('error removing from wishlist: ', error));
                break;
            }
            case 'ADD_TO_WISHLIST': {
                await axios.post('/api/wishLists', {
                    wishList: { ...payload, inWishList: true }
                }).then(response => {
                    // console.log("from cart context provider", response.data.wishList)
                    dispatch({ type: 'ADD_TO_WISHLIST', payload: response.data.wishList })
                    dispatch({ type: 'SET_TOAST', payload:{visible: true, text: "Successfully Added to Wishlist"}  })
                    removeToast();
                }).catch(error => {
                    console.log("from cart context provider", error)
                })
                break;
            }
            case 'REMOVE_FROM_WISHLIST': {
                await axios.delete(`/api/wishLists/${payload.id}`).then(response => {
                    console.log(response);
                    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: payload });
                    dispatch({ type: 'SET_TOAST', payload:{visible: true, text: "Successfully Removed from Wishlist"}  })
                    removeToast();
                }).catch(error => console.log('error removing from wishlist: ', error));
                break;
            }
            case 'INCREASE_CART_QTY': {
                await axios.put(`/api/cartLists/${payload.id}`, {
                    cartList: {
                        ...payload,
                        qty: payload.qty + 1
                    }
                }).then(response => {
                    console.log(response);
                    dispatch({ type: 'INCREASE_CART_QTY', payload: payload });
                    dispatch({ type: 'SET_TOAST', payload:{visible: true, text: "Successfully increased quantity"}  })
                    removeToast();
                }).catch(err => console.log(err))
                break;
            }
            case 'DECREASE_CART_QTY': {
                await axios.put(`/api/cartLists/${payload.id}`, {
                    cartList: {
                        ...payload,
                        qty: payload.qty - 1
                    }
                }).then(response => {
                    console.log(response);
                    dispatch({ type: 'DECREASE_CART_QTY', payload: payload });
                    dispatch({ type: 'SET_TOAST', payload:{visible: true, text: "Successfully decreased quantity"}  })
                    removeToast();
                }).catch(err => console.log(err))
                break;
            }
            case 'FETCH_TO_CART': {
                await axios.get('/api/wishLists').then((resp) => {
                    console.log('response from context', resp)
                }).catch(err => console.log('error from context'))
                break;
            }
            default: return null;
        }
    }

    const [state, dispatch] = useReducer(reducerFunction, {
        products: [],
        sort: null,
        showInventoryAll: false,
        showFastDelivery: false,
        cart: [],
        wishList: [],
        toast: {visible: false, text: "test"}
    });

    return (
        <dataContext.Provider value={{ state, dispatch, updateServer, fetchResource }}>
            {children}
        </dataContext.Provider>
    )
}

