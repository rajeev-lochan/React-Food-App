import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import axios from 'axios';
import { CartAction } from './Reducer/CartReducer';
import { useDispatch } from 'react-redux';
// import CartProvider from './Context/CartProvider';

function App() {

  const dispatch=useDispatch()

  useEffect(()=>{
    fetchCart();
  }, []);

  const fetchCart = async () =>{
    try{
      const {data} = await axios.get(
        "https://crudcrud.com/api/d24ae34d2de84f0aada52d85676fa40e/cart"
      );
      console.log(data);
      dispatch(CartAction.setFetchStatus(data))
    } catch (error){
      console.error("Error fetching data from API:", error);
    }
  }

  return (
    // <CartProvider>
      <Header />
    // </CartProvider>
  );
}

export default App;
//hgbk,hji 