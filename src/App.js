import { Home } from './pages/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { useState } from 'react';
import { Cart } from './pages/Cart/Cart';
import { useDataContext } from './context/cartContextProvider';
import { WishList } from './pages/WishList/WishList';
import { Route, Routes } from 'react-router-dom';

function App() {

  const { state } = useDataContext();
  const { route } = state;
  const [input, setInput] = useState('');

  return (
    <div className="App">
      <Navbar setInput={setInput} />
      <Routes>
          <Route path="/" element={<Home input={input}/>} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
