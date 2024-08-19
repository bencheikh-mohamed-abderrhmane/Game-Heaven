import React from 'react';
import Shop from './pages/Shop';
import Navbar from './componates/navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shopcategory from './pages/Shopcategory';
import kidbanner from './componates/assets/kidbanner.png'
import Product from './pages/Product';
import Cart from './pages/Cart';
import Loginsingup from './pages/Loginsingup';
import Footer from './componates/footer/Footer';
import menbanner from './componates/assets/menbanner.png'
import womenbanner from './componates/assets/womenbanner.png'
import Wishlist from './pages/WishlistItem';
import Offerspage from './componates/offers/Offerspage';
import Latest from './componates/hero/Latest';
import PaymentPage from './componates/order/PaymentPage'
import Thanks from './componates/Cartitems/Thanks'

function App(props) {
  return (
    <div>
      <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Shop/>}/>
    <Route path='/mens' element={<Shopcategory  banner={menbanner} category="men"/>}/>
    <Route path='/womens' element={<Shopcategory banner={womenbanner} category="women"/>}/>
    <Route path='/kids' element={<Shopcategory banner={kidbanner} category="kid"/>}/>
    <Route path="/product/:productid" element={<Product />} />
    
    <Route path='/wishlist' element={<Wishlist/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/login' element={<Loginsingup/>}/>
    <Route path='/offerspage' element={<Offerspage />} /> {/* Route pour la page des offres */}
    <Route path='/latest' element={<Latest />}/>
    <Route path='/submitcart' element={<PaymentPage />}/>
    <Route path='/orderconfirme' element={<Thanks />}/>
   </Routes>
   <Footer/>
   


   </BrowserRouter>
      
    </div>
  );
}

export default App;

