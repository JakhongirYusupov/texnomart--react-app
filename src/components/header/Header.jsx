import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import c from "./Header.module.css";
import { SlLocationPin } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { HiOutlineGlobe } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';

export default function Header() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [onMouseLang, setonMouseLang] = useState(false);
  const [activeRegion, setactiveRegion] = useState(t("headertop.location"));
  const [onMouseRegion, setonMouseRegion] = useState(false);

  const changeWebsiteLang = (e) => {
    i18n.changeLanguage(e.target.innerText.toLowerCase());
    setactiveRegion(t("headertop.location"))
  }

  const changeonMouseRegion = (e) => {
    setactiveRegion(el => e.target.innerText)
    setonMouseRegion(false)
  }
  return (
    <div className="header">
      <div className={c.headerTop}>
        <div className={c["headerTop-wrapper"]}>
          <div className={c["headerTop-location"]} onMouseEnter={() => setonMouseRegion(true)} onMouseLeave={() => setonMouseRegion(false)}>
            <div className={c["headerTop-location-main"]}>
              <SlLocationPin className={c.headerTop__location__icon}></SlLocationPin>
              <span>{activeRegion}</span>
            </div>
            {
              onMouseRegion ?
                <div className={c["headerTop-location-bar"]}>
                  <p onClick={changeonMouseRegion}>{t("headertop.location")}</p>
                  <p onClick={changeonMouseRegion}>{t("headertop.regions.tashkent")}</p>
                  <p onClick={changeonMouseRegion}>{t("headertop.regions.buxoro")}</p>
                  <p onClick={changeonMouseRegion}>{t("headertop.regions.andijon")}</p>
                  <p onClick={changeonMouseRegion}>{t("headertop.regions.fargona")}</p>
                  <p onClick={changeonMouseRegion}>{t("headertop.regions.namangan")}</p>
                  <p onClick={changeonMouseRegion}>{t("headertop.regions.samarqand")}</p>
                  <p onClick={changeonMouseRegion}>{t("headertop.regions.qoraqalpoq")}</p>
                </div>
                : null
            }
          </div>
          <nav>
            <ul className={c["headerTop-navBar"]}>
              <li><Link className={c["headerTop-navLink"]} to="/">{t("headertop.ourshop")}</Link></li>
              <li><Link className={c["headerTop-navLink"]} to="/">{t("headertop.b2b")}</Link></li>
              <li><Link className={c["headerTop-navLink"]} to="/">{t("headertop.time__price")}</Link></li>
              <li><Link className={c["headerTop-navLink"]} to="/">{t("headertop.price__type")}</Link></li>
              <li><Link className={c["headerTop-navLink"]} to="/">{t("headertop.guarantee")}</Link></li>
            </ul>
          </nav>
          <div className={c["headerTop-contact"]}>
            <div className={c["headerTop-number"]}>
              <p>{t("headertop.contact")}</p>
              <p>+99871 209 99 44</p>
            </div>
            <div className={c["headerTop-lang"]} onMouseEnter={() => setonMouseLang(true)} onMouseLeave={() => setonMouseLang(false)}>
              <HiOutlineGlobe className={c["headerTop-lang-icon"]}></HiOutlineGlobe>
              <p>{window.localStorage.getItem("lang") ? window.localStorage.getItem("lang").toUpperCase() : "EN"}</p>
              <IoIosArrowDown className={c["headerTop-lang-icon-arrow"]} />
              {
                onMouseLang ?
                  <div className={c["headerTop-lang-bar"]}>
                    <p onClick={changeWebsiteLang}>UZ</p>
                    <p onClick={changeWebsiteLang}>RU</p>
                    <p onClick={changeWebsiteLang}>EN</p>
                  </div>
                  : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
