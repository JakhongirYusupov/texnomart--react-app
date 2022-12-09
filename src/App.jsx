import { useState } from 'react';
import './App.css';
import HeaderMain from './components/header-main/HeaderMain';
import HeaderTop from './components/header-top/HeaderTop';
import { useTranslation } from 'react-i18next';
import Routes from './routes';
import Footer from './components/footer/Footer';
import SignupLogin from './components/signup-login/SignupLogin';

function App() {
  const { t } = useTranslation();
  const [activeSelect, setactiveSelect] = useState(t("headermain.select.all"));
  const [activeLogin, setactiveLogin] = useState(false);

  return (
    <div className='App'>
      <HeaderTop setactiveSelect={setactiveSelect} />
      <HeaderMain activeSelect={activeSelect} setactiveSelect={setactiveSelect} setactiveLogin={setactiveLogin} />
      <Routes />
      <Footer />
      {
        activeLogin ? <SignupLogin setactiveLogin={setactiveLogin} /> : null
      }
    </div>
  );
}

export default App;
