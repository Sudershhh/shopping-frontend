import { useEffect } from 'react'

import './App.scss';
import Main from './Components/Main/Main';
import Navbar from './Components/Navbar/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,  
} from "react-router-dom";
import Product from './Components/Product/Product';
import Login from './Components/Login/Login';
import Register from "./Components/Register/Register"
import Cart from './Components/Cart/Cart';
import ProductContainer from './Components/ProductContainer/ProductContainer';
import Success from './Components/Success/Success'
import { useDispatch, useSelector } from 'react-redux';
import Orders from './Components/Orders/Orders';
import { fetchCartProducts } from './redux/apiCalls'
import Loading from './Components/Loading/Loading';



function App() {


  const user = useSelector(state=>state.user.currentUser)

  const dispatch = useDispatch()
  useEffect(()=>{

    if(user) fetchCartProducts(dispatch,user._id,user.accessToken)

},[user])

  return (
    <div className='app'>
        <BrowserRouter>
        <Routes>





          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />}>
            
          </Route>

          <Route path ='/register' element={ user ? <Navigate to='/' /> : <Register />} />
          
          
          
          
          
          <Route exact path='/' element={<> <Navbar /> <Main/>
                                          </>  }
                                          
                                          
                                          render={() => {
                                            return (
                                                user ?
                                                <Navigate to='/' /> :
                                                <Navigate to='/login' />
                                            )
                                        }}
                                          />





          <Route path='/product/:id' element={<div className='main-product-container'> <Navbar /> <Product /> 
                                          </div>} />

          <Route path='/products/:category' element={<><Navbar /><ProductContainer /> </>} />


          <Route path='/cart' element={<> <Navbar /> <Cart /> </> } />


          <Route path ='/success' element={<Success />} />

          <Route path='/orders' element={<>
            
            <Navbar /> 
            <Orders /> 
          </>}/>
          
          
          <Route path='/loading' element={<Loading />} />
          


         
        </Routes>
        
        
        </BrowserRouter>
    </div>

  );
}

export default App;
