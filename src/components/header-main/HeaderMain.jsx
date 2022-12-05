import { useState } from 'react'
import c from './HeaderMain.module.css';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/texnomart-logo.svg';
import { BsMic, BsSearch, BsBoxSeam, BsCart3, BsPerson } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineHeart } from 'react-icons/ai';
import { GiScales } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export default function HeaderMain() {
  const { t } = useTranslation();

  const [onMouseSelect, setonMouseSelect] = useState(false);
  const [activeSelect, setactiveSelect] = useState(t("headermain.select.all"));

  const setSelect = (e) => {
    setactiveSelect(e.target.innerText);
    setonMouseSelect(false);
  }
  return (
    <div className='header'>
      <div className={c.headerMain}>
        <div className={c["headerMain__logo-wrapper"]}>
          <img src={logo} alt="texnomart" />
        </div>
        <div className={c["headerMain__search"]}>
          <form className={c.form} action="">
            <div className={c["headerMain__select-wrapper"]} onMouseEnter={() => setonMouseSelect(true)} onMouseLeave={() => setonMouseSelect(false)}>
              <span>{activeSelect}</span>
              <IoIosArrowDown className={c["headerMain__select-icon"]} />
              {
                onMouseSelect ?
                  <div className={c["headerMain__select-bar"]}>
                    <p onClick={setSelect}>{t("headermain.select.all")}</p>
                    <p onClick={setSelect}>{t("headermain.select.texnica")}</p>
                    <p onClick={setSelect}>{t("headermain.select.office")}</p>
                    <p onClick={setSelect}>{t("headermain.select.kitchen")}</p>
                    <p onClick={setSelect}>{t("headermain.select.home")}</p>
                    <p onClick={setSelect}>{t("headermain.select.car")}</p>
                    <p onClick={setSelect}>{t("headermain.select.weather")}</p>
                    <p onClick={setSelect}>{t("headermain.select.tv")}</p>
                    <p onClick={setSelect}>{t("headermain.select.phone")}</p>
                    <p onClick={setSelect}>{t("headermain.select.computer")}</p>
                  </div>
                  : null
              }
            </div>
            <input type="text" className={c.headerMain__input} />
            <div className={c["headerMain__microphone"]}><BsMic className={c["headerMain__microphone-icon"]} /></div>
            <div className={c["headerMain__search-btn-wrapper"]}><BsSearch className={c["headerMain__search-btn"]} /></div>
          </form>
        </div>
        <div className={c["navBar"]}>
          <Link className={c["navBar-item"]}>
            <div><BsBoxSeam className={c["navBar-item-icon"]} /></div>
            <span>{t("headermain.order")}</span>
          </Link>
          <Link className={c["navBar-item"]}>
            <div><BsPerson className={c["navBar-item-icon"]} /></div>
            <span>{t("headermain.enter")}</span>
          </Link>
          <Link className={c["navBar-item"]}>
            <div><GiScales className={c["navBar-item-icon"]} /></div>
            <span>{t("headermain.comparison")}</span>
          </Link>
          <Link className={c["navBar-item"]}>
            <div><AiOutlineHeart className={c["navBar-item-icon"]} /></div>
            <span>{t("headermain.favourite")}</span>
          </Link>
          <Link className={c["navBar-item"]}>
            <div><BsCart3 className={c["navBar-item-icon"]} /></div>
            <span>{t("headermain.cart")}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
