import { useState } from 'react';
import './App.css';
import HeaderMain from './components/header-main/HeaderMain';
import HeaderTop from './components/header-top/HeaderTop';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const [activeSelect, setactiveSelect] = useState(t("headermain.select.all"));

  return (
    <div>
      <HeaderTop setactiveSelect={setactiveSelect} />
      <HeaderMain activeSelect={activeSelect} setactiveSelect={setactiveSelect} />
    </div>
  );
}

export default App;
