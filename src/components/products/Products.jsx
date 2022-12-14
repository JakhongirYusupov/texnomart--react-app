import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import images from '../../data/company-logos.json';
import publicCategory from '../../data/public-category.json';

import c from './Products.module.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Link } from "react-router-dom";
import { BsCart3, BsArrowRightShort, BsCartCheck } from 'react-icons/bs';
import { useEffect, useState } from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import { GiScales } from 'react-icons/gi';
import supportData from '../../data/support-dummy-data.json';
import { useDispatch, useSelector } from "react-redux";

export default function Products({ setactiveCart }) {

  const [dataClothes, setdataClothes] = useState(null);
  const [dataElectronics, setdataElectronics] = useState(null);
  const [dataFurniture, setdataFurniture] = useState(null);
  const [dataShoes, setdataShoes] = useState(null);
  const [dataOthers, setdataOthers] = useState(null);
  const [mediaSwiper, setmediaSwiper] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const dataCart = useSelector(state => state);
  const { comparison } = useSelector(state => state);

  const fetch = (url, setMethod) => {
    axios.get(url)
      .then(({ data }) => setMethod(data))
      .catch()
  };

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories/1/products", setdataClothes);
    fetch("https://api.escuelajs.co/api/v1/categories/2/products", setdataElectronics);
    fetch("https://api.escuelajs.co/api/v1/categories/3/products", setdataFurniture);
    fetch("https://api.escuelajs.co/api/v1/categories/4/products", setdataShoes);
    fetch("https://api.escuelajs.co/api/v1/categories/5/products", setdataOthers);
  }, []);

  window.addEventListener("resize", () => {
    const { innerWidth } = window;
    setmediaSwiper(innerWidth)
  })

  const dispatchProduct = (data) => {
    const action = {
      type: "ADD_TO_CART",
      data: data
    }

    dispatch(action);
  }

  const minusCount = ((id) => {
    const action = {
      type: "MINUS_PRODUCT_COUNT",
      productId: id
    }

    dispatch(action)
  })
  const pilusCount = ((id) => {
    const action = {
      type: "PILUS_PRODUCT_COUNT",
      productId: id
    }

    dispatch(action)
  })

  const dispatchToCompare = ((data) => {
    const action = {
      type: "ADD_TO_COMPARISON",
      data: data
    }

    dispatch(action)
  })

  return (
    <div className={c["products"]}>
      <div className="container">
        <div className={c["company-logos"]}>
          <Swiper
            slidesPerView="auto"
            spaceBetween={images.length}
            loop={false}
            navigation={mediaSwiper > 1024 ? true : false}
            modules={[Navigation]}
            className=""
          >
            {
              images.map(e => {
                return <SwiperSlide key={uuidv4()} className={c["swiper-img"]}><img src={e} alt="img" /></SwiperSlide>
              })
            }

          </Swiper>
        </div>
        <div className={c["public-category"]}>
          <h3>{publicCategory.title}</h3>
          <div className={c["public-category-banner"]}>
            <Swiper
              slidesPerView="auto"
              spaceBetween={publicCategory.categories.length}
              loop={false}
              navigation={mediaSwiper > 1024 ? true : false}
              modules={[Navigation]}
              className=""
            >
              {
                publicCategory.categories.map(({ name, image }) => {
                  return <SwiperSlide key={uuidv4()} className={c["public-category-img"]}>
                    <img src={image} alt="img" />
                    <p>{name}</p>
                  </SwiperSlide>
                })
              }

            </Swiper>
          </div>
        </div>
        {
          [dataClothes, dataElectronics, dataFurniture, dataShoes, dataOthers].map((data) => {
            return (
              data ?
                <div key={uuidv4()}>
                  <div className={c["product-swiper-title"]}>
                    <h2>{data[0].category.name}</h2>
                    <Link to={"/category/products/" + data[0].category.id}>Barchasini ko'rish <BsArrowRightShort /></Link>
                  </div>
                  <Swiper
                    slidesPerView="auto"
                    spaceBetween={10}
                    loop={false}
                    navigation={mediaSwiper > 1024 ? true : false}
                    modules={[Navigation]}
                    className={c["product-swiper-wrapper"]}
                  >
                    {
                      data.slice(1, 10).map(({ id, title, price, images, description, category }) => {
                        return (
                          <SwiperSlide key={uuidv4()} className={c["product-item"]}>
                            <Link to={"pdp/" + id} className={c["product-item-wrapper"]}>
                              <div className={c["product-item-img"]}>
                                <img src={images[1]} alt="" />
                              </div>
                              <article className={c["product-item-main"]}>
                                <div className={c["product-item-main-wrapper"]}>
                                  <h1>{title}</h1>
                                  <strong className={c["product-item-main-sale-price"]}>{price + 40} $</strong><br />
                                  <strong>{price} $</strong>
                                </div>
                              </article>
                            </Link>
                            {
                              dataCart.cart.data.find((e) => e.id === id) ?
                                <div className={c["product-addedCart-wrapper"]}>
                                  <div className={c["product-addedCart-icon"]} onClick={(() => setactiveCart(true))} >
                                    <BsCartCheck className={c["product-item-cart-icon"]} />
                                  </div>
                                  <div className={c["product-addedCart-count"]}>
                                    <div onClick={(() => minusCount(id))}>-</div>
                                    <div>{dataCart.cart.data.find((e) => e.id === id).count}</div>
                                    <div onClick={(() => pilusCount(id))}>+</div>
                                  </div>
                                </div>
                                :
                                <div className={c["product-item-cart-wrapper"]}>
                                  <div className={c["product-item-cart"]} onClick={(() => dispatchProduct({ id, title, price, images, count: 1 }))}>
                                    <BsCart3 className={c["product-item-cart-icon"]} />
                                    <p>Savatchaga</p>
                                  </div>
                                  <div>
                                    <AiOutlineHeart className={c["product-item-cart-icons"]} />
                                  </div>
                                  <div onClick={(() => dispatchToCompare({ id, title, price, images, description, category }))}>
                                    <GiScales style={comparison.data.find((e) => e.id === id) ? { color: "#FBC100" } : null} className={c["product-item-cart-icons"]} />
                                  </div>
                                </div>
                            }
                          </SwiperSlide>
                        );
                      })
                    }

                  </Swiper>
                </div>
                : null
            )
          })
        }
        <div className={c["support-wrapper"]}>
          <h3>???????????????????? ???? ???????????? ?????????????? ???????????????? ??????????????</h3>
          <div className={c["support"]}>
            {
              supportData.map(({ title, desc, img }) => {
                return (
                  <Link key={uuidv4()} to="/" className={c["support-item"]}>
                    <div className={c["support-item-img"]}>
                      <img src={img} alt="" />
                    </div>
                    <div className={c["support-item-main"]}>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                  </Link>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
