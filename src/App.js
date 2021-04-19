import { Home } from './pages/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { useState } from 'react';
import { Cart } from './pages/Cart/Cart';
import { useDataContext } from './context/cartContextProvider';
import { WishList } from './pages/WishList/WishList';
import { Route, Routes } from 'react-router-dom';
import { Toast } from './components/Toast/Toast';
import axios from 'axios';

function App() {

  const { state } = useDataContext();
  const { toast } = state;
  const [input, setInput] = useState('');

  async function clickHandler() {
    await axios.get('http://localhost:8000/products').then((resp) => {
      console.log('from context', resp)
      // dispatch({ type: 'ADD_PRODUCTS_FROM_SERVER', payload: resp.data.products });
      // dispatch({ type: 'ADD_PRODUCTS_FROM_SERVER', payload: resp.products2 });
    }).catch(err => alert('failed to fetch data from server: ', err));
  }

  return (
    <div className="App">
      <Navbar setInput={setInput} />
      <Routes>
        <Route path="/" element={<Home input={input} />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {toast.visible && <Toast text={toast.text} />}
      {/* <button
        onClick={clickHandler}
      >click me</button> */}
    </div>
  );
}

export default App;
