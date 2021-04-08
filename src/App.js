import {Home} from './components/Home/Home';
import {Navbar} from './components/Navbar/Navbar';
import {useState} from 'react';
import {Cart} from './components/Cart/Cart';
import {useDataContext} from './context/cartContextProvider';
import {WishList} from './components/WishList/WishList';

function App() {

  const {state} = useDataContext();
  const {route} = state;
  const [input, setInput] = useState('');

  return (
    <div className="App">
      <Navbar setInput={setInput}/>
      {route === "HOME" && <Home input={input}/>}
      {route === "CART" && <Cart />}
      {route === "WISHLIST" && <WishList />}
    </div>
  );
}

export default App;
