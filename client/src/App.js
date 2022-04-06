import logo from './logo.svg';
import './App.css';
import Navbar from './components/shared/NavBar';
import { Routes, Route, useParams} from 'react-router-dom';
import Home from './components/shared/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NoMatch from './components/shared/NoMatch';
import HomeClass from './components/shared/HomeClass';
import FetchUser from './components/shared/FetchUser';
import ProtectedRoute from './components/shared/ProtectRoute';
import Products from './components/Pages/Products';
import Categories from './components/Pages/Category';
import FindProducts from './components/Pages/FindProducts';

// Fetch user: it is going to see if the user is logged in(valid user)
function App() {
  return (
    <div>
      <Navbar />
      {/* When our app first mounts FetchUser Runs */}
      <FetchUser>
        <>
          <Routes>
            {/* Unprotected */}
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/' element={<Home />}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/categories' element={<Categories/>}/>
            <Route path='/find_products' element={<FindProducts/>}/>
            <Route path='/products/:seller_id' element={<FindProducts/>}/>
            
           
                {/* protected in routes inside of here you need to logged in*/}
                {/* else you go to login page*/}
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<HomeClass yo={'yoyo'} />}/>
            </Route>  
            <Route path='*' element={<NoMatch />}/>
          </Routes>
        </>
      </FetchUser>
      <p style={{ padding: '10px', display: 'flex', justifyContent: 'center', background: '#181818', color: '#4fc4cf', fontFamily: 'Comfortaa' }}>GAME ON</p>
    </div>
  );
}

export default App;
