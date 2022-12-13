import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai';
import { GiScales } from 'react-icons/gi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart3, BsCartCheck } from 'react-icons/bs';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdAdsClick } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import c from './Pdp.module.css';
import { useDispatch, useSelector } from 'react-redux';

export default function Pdp({ setactiveCart }) {
  const { productId } = useParams();
  const [data, setData] = useState(null);
  const [activeImg, setactiveImg] = useState(null);

  const dataCart = useSelector(state => state);
  const { comparison } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then((res) => {
        setData(res.data)
        setactiveImg(res.data.images[0])
      })
      .catch()
  }, [productId])


  const dispatchProduct = () => {
    const action = {
      type: "ADD_TO_CART",
      data: {
        id: data.id,
        title: data.title,
        images: data.images,
        price: data.price,
        count: 1
      }
    }

    dispatch(action);
  }

  const minusCount = (() => {
    const action = {
      type: "MINUS_PRODUCT_COUNT",
      productId: +productId
    }

    dispatch(action)
  })
  const pilusCount = (() => {
    const action = {
      type: "PILUS_PRODUCT_COUNT",
      productId: +productId
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
    data ?
      <div className={c.pdp}>
        <div className={c["pdp-top"]}>
          <div className="container">
            <div className={c["pdp-top-title"]}>
              <h1>{data.title}</h1>
              <p>Barcha mahsulotlar</p>
            </div>
            <div className={c["pdp-top-articles"]}>
              <div className={c["pdp-top-articles-wrapper"]}>
                <div>
                  <AiFillStar className={c["pdp-top-articles-stars"]} />
                  <AiFillStar className={c["pdp-top-articles-stars"]} />
                  <AiFillStar className={c["pdp-top-articles-stars"]} />
                  <AiFillStar className={c["pdp-top-articles-stars"]} />
                  <AiFillStar className={c["pdp-top-articles-stars"]} />
                </div>
                <div className={c["pdp-top-articles-lonely"]}>
                  <AiOutlineHeart className={c["pdp-top-articles-icon"]} />
                  <span>Sevimlilarga</span>
                </div>
                <div onClick={(() => dispatchToCompare(data))} className={c["pdp-top-articles-lonely"]}>
                  <GiScales style={comparison.data.find((e) => e.id === data.id) ? { color: "#FBC100" } : null} className={c["pdp-top-articles-icon"]} />
                  <span>Taqqoslashga</span>
                </div>
              </div>
              <div className={c["pdp-top-kod"]}>
                <span>Kod: {data.id}</span>
                <div className={c["pdp-top-kod-alive"]}>
                  <BsFillCheckCircleFill className={c["pdp-top-kod-alive-icon"]} />
                  <span>Mavjud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={c["pdp-main"]}>
            <div className={c["pdp-main-img-wrapper"]}>
              <div className={c["pdp-main-img"]}>
                <img src={activeImg} alt="" />
              </div>
              <div className={c["pdp-main-img-swiper"]}>
                {
                  data.images.map((img) => {
                    return (
                      <img onClick={(() => setactiveImg(img))} key={uuidv4()} src={img} alt="" className={activeImg === img ? c["pdp-main-img-swiper-border"] : null} />
                    )
                  })
                }
              </div>
            </div>
            <div className={c["pdp-about-wrapper"]}>
              <div className={c["pdp-about-color"]}>
                <span>Rang</span>
                <img src={activeImg} alt="" />
              </div>
              <div className={c["pdp-about"]}>
                <div className={c["pdp-about-title"]}>
                  <h3>Maxsulot haqida qisqacha</h3>
                </div>
                <div className={c["pdp-about-product"]}>
                  <div className={c["pdp-about-product-item"]}><p>id</p><p>{data.id}</p></div>
                  <div className={c["pdp-about-product-item"]}><p>title</p><p>{data.title}</p></div>
                  <div className={c["pdp-about-product-item"]}><p>price</p><p>{data.price} $</p></div>
                  <div className={c["pdp-about-product-item"]}><p>desc</p><p>{data.description}</p></div>
                </div>
              </div>
            </div>
            {
              dataCart.cart.data.find((e) => e.id === +productId) ?
                <div className={c["product-addedCart-wrapper"]}>
                  <div className={c["product-addedCart-icon"]} onClick={(() => setactiveCart(true))} >
                    <BsCartCheck className={c["product-item-cart-icon"]} />
                  </div>
                  <div className={c["product-addedCart-count"]}>
                    <div onClick={(() => minusCount())}>-</div>
                    <div>{dataCart.cart.data.find((e) => e.id === +productId).count}</div>
                    <div onClick={(() => pilusCount())}>+</div>
                  </div>
                </div>
                :
                <div className={c["pdp-tocart"]}>
                  <h2>{data.price} $</h2>
                  <div onClick={dispatchProduct} className={c["pdp-tocart-buy-btn"]}>
                    <BsCart3 className={c["pdp-tocart-buy-btn-icon"]} />
                    <p >Savatchaga</p>
                  </div>
                  <div className={`${c["pdp-tocart-buy-btn"]} ${c["pdp-tocart-click-btn"]}`}>
                    <MdAdsClick className={c["pdp-tocart-buy-btn-icon"]} />
                    <p>Birgina click orqali harid</p>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
      : null
  )
}
