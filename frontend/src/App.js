import { Routes, Route } from 'react-router-dom';
import Navigate from './Components/Navigation/Navigate';
import Home from './Components/Home/Home';
import Footer from './Components/Navigation/Footer';
import Conditions from './Components/Terms&Conditions/Conditions';
import PrivacyPolicy from './Components/Terms&Conditions/PrivacyPolicy';
import DogProducts from './Components/Dog Sector/DogProducts';
import CatProducts from './Components/Cat Sector/CatProducts';
import FishProducts from './Components/Fish Sector/FishProducts';
import BirdProducts from './Components/Bird Sector/BirdProducts';
import ScrollToTopButton from './Components/ScrollToTopButton/ScrollToTopButton';
import Register from './Components/Register & LogIn/Register';
import About from './Components/About/About';
import AboutCards from './Components/About/AboutCards';
import Cardd from './Components/About/Cardd';
import CreateCard from './Components/About/CreateCard';
import DetailCard from './Components/About/DetailCard';
import UpdateCard from './Components/About/UpdateCard';
import CreateCat from './Components/About/CreateCat';
import CartList from './Components/Shopping Cart/CartList'
import CartSummary from './Components/Shopping Cart/CartSummary';
import SignUpAdmin from './Components/Admin/SignUpAdmin';
import { UserContextProvider } from './UserContext';


function App() {
  return (
    <>
      <UserContextProvider>
        <Navigate></Navigate>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />}></Route>
          <Route path='/conditions' element={<Conditions />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy />}></Route>
          <Route path='/admin' element={<SignUpAdmin />}></Route>
          <Route path='/cart' element={<CartList />}></Route>
          <Route path='/cartsum' element={<CartSummary />}></Route>

          <Route path="/create_product" element={<CreateCard />} />
          <Route path="/product/:id" element={<DetailCard />} />
          <Route path="/product_update/:id" element={<UpdateCard />} />
          <Route path="/cardd" element={<Cardd />} />
          <Route path='/createCat' element={<CreateCat />}></Route>
          <Route path="/products/:id" element={<AboutCards />} />
          <Route path="/category/:slug" element={<DogProducts />} />

          <Route path='/dogproducts' element={<DogProducts />}></Route>
          <Route path='/dogtoys' element={<DogProducts />}></Route>
          <Route path='/dogfood' element={<DogProducts />}></Route>
          <Route path='/dogaccessories' element={<DogProducts />}></Route>

          <Route path='/catproducts' element={<CatProducts />}></Route>
          <Route path='/cattoys' element={<CatProducts />}></Route>
          <Route path='/catfood' element={<CatProducts />}></Route>
          <Route path='/cataccessories' element={<CatProducts />}></Route>

          <Route path='/birdproducts' element={<BirdProducts />}></Route>
          <Route path='/birdtoys' element={<BirdProducts />}></Route>
          <Route path='/birdfood' element={<BirdProducts />}></Route>
          <Route path='/birdaccessories' element={<BirdProducts />}></Route>

          <Route path='/fishproducts' element={<FishProducts />}></Route>
          <Route path='/fishtoys' element={<FishProducts />}></Route>
          <Route path='/fishfood' element={<FishProducts />}></Route>
          <Route path='/fishaccessories' element={<FishProducts />}></Route>

          <Route path='/register' element={<Register />}></Route>
        </Routes>
        <ScrollToTopButton></ScrollToTopButton>
        <Footer></Footer>
      </UserContextProvider>
    </>
  );
}

export default App;
