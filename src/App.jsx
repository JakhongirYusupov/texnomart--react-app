import { useState } from 'react';
import './App.css';
import HeaderMain from './components/header-main/HeaderMain';
import HeaderTop from './components/header-top/HeaderTop';
import { useTranslation } from 'react-i18next';
import Routes from './routes';
import Footer from './components/footer/Footer';
import SignupLogin from './components/signup-login/SignupLogin';
import Cart from './components/cart/Cart';

function App() {
  const { t } = useTranslation();
  const [activeSelect, setactiveSelect] = useState(t("headermain.select.all"));
  const [activeLogin, setactiveLogin] = useState(false);
  const [windowscrollY, setwindowscrollY] = useState(false);
  const [activeCart, setactiveCart] = useState(false);

  return (
    <div className='App'>
      <HeaderTop setactiveSelect={setactiveSelect} />
      <HeaderMain activeSelect={activeSelect} setactiveSelect={setactiveSelect} setactiveLogin={setactiveLogin} scrollY={windowscrollY} setactiveCart={setactiveCart} />
      <Routes />
      <Footer />
      {
        activeLogin ? <SignupLogin setactiveLogin={setactiveLogin} /> : null
      }
      {
        activeCart ? <Cart setactiveCart={setactiveCart} /> : null
      }
      {
        window.addEventListener("scroll", (e) => {
          if (window.scrollY >= 500) setwindowscrollY(true)
          else setwindowscrollY(false)
        })
      }
    </div>
  );
}

export default App;
