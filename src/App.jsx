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
  const [mobulewindowscrollY, setmobulewindowscrollY] = useState(false);
  const [activeCart, setactiveCart] = useState(false);
  const [activeRegion, setactiveRegion] = useState(t("headertop.location"));
  const [onMouseRegion, setonMouseRegion] = useState(false);

  return (
    <div className='App'>
      <HeaderTop setactiveSelect={setactiveSelect} />
      <HeaderMain
        activeSelect={activeSelect}
        setactiveSelect={setactiveSelect}
        setactiveLogin={setactiveLogin}
        scrollY={windowscrollY}
        mobulescrollY={mobulewindowscrollY}
        setactiveCart={setactiveCart}
        activeRegion={activeRegion}
        setactiveRegion={setactiveRegion}
        onMouseRegion={onMouseRegion}
        setonMouseRegion={setonMouseRegion}
      />
      <Routes setactiveCart={setactiveCart} />
      <Footer />
      {
        activeLogin ? <SignupLogin setactiveLogin={setactiveLogin} /> : null
      }
      {
        activeCart ? <Cart setactiveCart={setactiveCart} /> : null
      }
      {
        window.addEventListener("scroll", (e) => {
          const { innerWidth } = window;
          if (window.scrollY >= 500 && innerWidth > 956) {
            setwindowscrollY(true)
          }
          else if (window.scrollY >= 500 && innerWidth < 957) {
            setwindowscrollY(false)
            setmobulewindowscrollY(true)
          }
          else {
            setwindowscrollY(false)
            setmobulewindowscrollY(false)
          }
        })
      }
    </div>
  );
}

export default App;
