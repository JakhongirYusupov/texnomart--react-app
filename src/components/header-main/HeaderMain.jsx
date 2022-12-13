import { useEffect, useState } from 'react'
import c from './HeaderMain.module.css';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/texnomart-logo.svg';
import { BsMic, BsSearch, BsBoxSeam, BsCart3, BsPerson, BsTelephone } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { AiOutlineHeart, AiFillThunderbolt } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { GiHamburgerMenu, GiScales } from 'react-icons/gi';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import dataKatalog from '../../data/katalog-dummy-data.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { SlLocationPin } from 'react-icons/sl';

export default function HeaderMain({
  setactiveSelect, activeSelect, setactiveLogin, scrollY, setactiveCart,
  activeRegion, setactiveRegion, onMouseRegion, setonMouseRegion, mobulescrollY }) {
  const { t } = useTranslation();
  const history = useHistory();

  const [onMouseSelect, setonMouseSelect] = useState(false);
  const [getCategory, setgetCategory] = useState(null);
  const [katalogBar, setkatalogBar] = useState(dataKatalog[0]);
  const [isactiveKatalog, setisactiveKatalog] = useState(false);
  const [searchInputValue, setsearchInputValue] = useState("");
  const cartData = useSelector(state => state);

  const {
    transcript
  } = useSpeechRecognition();

  const getSpeechValue = (() => {
    SpeechRecognition.startListening()
  })

  useEffect(() => {
    setsearchInputValue(transcript)
  }, [transcript])

  const setSelect = (e) => {
    setactiveSelect(e.target.innerText);
    setonMouseSelect(false);
  }

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/categories")
      .then(res => setgetCategory(res.data))
  }, [])

  const changeonMouseRegion = (e) => {
    setactiveRegion(el => e.target.innerText)
    setonMouseRegion(false)
  }

  return (
    <div className='header'>
      <div className="container">
        <div className={scrollY ? `${c.headerMain}` : null}>
          <div className={c.headerMainWrapper}>
            <div className={c.headerMain_location_bar}>
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
              <Link to="/" className={c["headerMain__logo-wrapper"]}>
                <img src={logo} alt="texnomart" />
              </Link>
              <div className={c["headerTop-number"]}>
                <BsTelephone className={c["headerTop-number-icon"]} />
                <p>+99871 209 99 44</p>
              </div>
            </div>
            <div className={mobulescrollY ? c["headerMain__search-wrapper-mobile"] : c["header__search-mobile-fixed"]}>
              <div className={c["headerMain__search-wrapper"]}>
                <div className={c["headerMain__hamburger"]} onClick={() => setisactiveKatalog((e) => e ? false : true)}>
                  {
                    isactiveKatalog ?
                      <IoMdClose className={c["headerMain__hamburger-icon"]} />
                      : <GiHamburgerMenu className={c["headerMain__hamburger-icon"]} />
                  }
                </div>
                <div className={c["headerMain__search"]}>
                  <form className={c.form} action="" onSubmit={(() => history.push("/search/" + searchInputValue))}>
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
                    <input value={searchInputValue} required minLength={3} maxLength={30} type="text" className={c.headerMain__input} onChange={((e) => setsearchInputValue(e.target.value))} />
                    <div className={c["headerMain__microphone"]}><BsMic className={c["headerMain__microphone-icon"]} onClick={getSpeechValue} /></div>
                    <button className={c["headerMain__search-btn-wrapper"]}>
                      <BsSearch className={c["headerMain__search-btn"]} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className={c["navBar"]}>
              <Link to="/" className={c["navBar-item"]}>
                <div><BsBoxSeam className={c["navBar-item-icon"]} /></div>
                <span>{t("headermain.order")}</span>
              </Link>
              <Link to="/" className={c["navBar-item"]} onClick={(() => setactiveLogin(true))}>
                <div><BsPerson className={c["navBar-item-icon"]} /></div>
                <span>{t("headermain.enter")}</span>
              </Link>
              <Link to="/comparison" className={c["navBar-item"]}>
                <div style={{ position: "relative" }}>
                  {
                    cartData.comparison.data.length ?
                      <div className={c["navBar__cart-count"]}>{cartData.comparison.data.length}</div>
                      : null
                  }
                  <GiScales className={c["navBar-item-icon"]} />
                </div>
                <span>{t("headermain.comparison")}</span>
              </Link>
              <Link to="/" className={c["navBar-item"]}>
                <div><AiOutlineHeart className={c["navBar-item-icon"]} /></div>
                <span>{t("headermain.favourite")}</span>
              </Link>
              <div onClick={(() => setactiveCart(true))} className={c["navBar-item"]}>
                <div style={{ position: "relative" }}>
                  {
                    cartData.cart.data.length ?
                      <div className={c["navBar__cart-count"]}>{cartData.cart.data.length}</div>
                      : null
                  }
                  <BsCart3 className={c["navBar-item-icon"]} />
                </div>
                <span>{t("headermain.cart")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={c.headerBottom}>
          <div className={c["headerBottom-katalog"]} onClick={() => setisactiveKatalog((e) => e ? false : true)}>
            {
              isactiveKatalog ?
                <IoMdClose className={c["headerBottom__nav-item-icon"]} />
                : <BiCategory className={c["headerBottom__nav-item-icon"]} />
            }
            <span>{t("headerbottom.katalog")}</span>
          </div>
          <nav className={c["headerBottom__nav"]}>
            <div className={c["headerBottom__nav-item-yellow-weak"]}>
              <AiFillThunderbolt className={c["headerBottom__nav-item-icon"]} />
              <span>{t("headerbottom.yellowweak")}</span>
            </div>
            {
              getCategory ?
                getCategory.map(({ name, id }) => {
                  return (
                    <div key={id} className={c["headerBottom__nav-item"]}>
                      <span>{name}</span>
                    </div>
                  )
                })
                : null
            }
          </nav>
        </div>
      </div>
      {
        isactiveKatalog ?
          <div className={c["headerKatalog"]}>
            <div className={c["headerKatalog-wrapper"]}>
              <div className={c["headerKatalog-nav"]}>
                {
                  dataKatalog ?
                    dataKatalog.map(({ title, image, category }) => {
                      return (
                        <div key={uuidv4()} className={c["headerKatalog-nav-item"]}
                          onMouseOver={((e) => setkatalogBar({ title, category }))}>
                          <img src={image} className={c["headerKatalog-nav-img-icon"]} alt="icon" />
                          <span>{title}</span>
                          <IoIosArrowForward className={c["headerKatalog-nav-arrow-icon"]} />
                        </div>
                      )
                    })
                    : null
                }
              </div>
              <div className={c["headerKatalog-nav-bar"]}>
                {
                  katalogBar ?
                    <>
                      <div className={c["headerKatalog-nav-bar-title"]}>{katalogBar.title}</div>
                      <div>
                        <div className={c["headerKatalog-nav-bar-sub__title-wrapper"]}>
                          <Link to="/" className={c["headerKatalog-nav-bar-sub__title"]}>
                            {katalogBar.category.sub__title}
                          </Link>
                        </div>
                        <div className={c["headerKatalog-nav-bar-links-wrapper"]}>
                          {
                            katalogBar.category.categories.map(e => {
                              return (
                                <Link to="/" key={uuidv4()}>{e}</Link>
                              )
                            })
                          }
                        </div>
                      </div>
                    </>
                    : null
                }
              </div>
            </div>
          </div>
          : null
      }
    </div >
  )
}
