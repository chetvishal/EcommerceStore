import { Home } from './pages/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { useState } from 'react';
import { Cart } from './pages/Cart/Cart';
import { useDataContext } from './context/cartContextProvider';
import { WishList } from './pages/WishList/WishList';
import { Route, Routes } from 'react-router-dom';
import {Toast} from './components/Toast/Toast';

function App() {

  const { state } = useDataContext();
  const { toast } = state;
  const [input, setInput] = useState('');

  return (
    <div className="App">
      <Navbar setInput={setInput} />
      <Routes>
          <Route path="/" element={<Home input={input}/>} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
      </Routes>
      {toast.visible && <Toast text={toast.text} />}
      
    </div>
  );
}

export default App;
