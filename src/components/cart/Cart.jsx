import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart3, BsTrash } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import c from './Cart.module.css';

export default function Cart({ setactiveCart }) {
  const dispatch = useDispatch();
  const data = useSelector(state => state);

  let allPrice = 0
  return (
    <div className={c["cart-modal"]}>
      <div className={c["cart-wrapper"]}>
        <div onClick={(() => setactiveCart(false))} className={c["cart-close-icon-wrapper"]} ><IoMdClose className={c["cart-close-icon"]} /></div>
        <div className={c["cart-title"]}>
          <h3>Hozir xarid qilish</h3>
        </div>
        {
          data.data.length ?
            <div className={c["cart-products"]}>
              {
                data.data.map(({ id, title, images, price }) => {
                  allPrice += price
                  return (
                    <div key={id} className={c["cart-product-item"]}>
                      <div className={c["cart-product-img"]}>
                        <img src={images[1]} alt="" />
                      </div>
                      <div className={c["cart-product-main"]}>
                        <p>{title}</p>
                        <strong>{price} $</strong>
                      </div>
                      <div className={c["cart-product-articles"]}>
                        <div className={c["cart-product-count"]}>
                          <div>-</div>
                          <div>{1}</div>
                          <div>+</div>
                        </div>
                        <div className={c["cart-product-removeAndLonely"]}>
                          <AiOutlineHeart className={c["cart-product-removeAndLonely-icon"]} />
                          <BsTrash onClick={(() => {
                            dispatch({
                              type: "DELETE_FROM_CART",
                              id: id
                            })
                          })} className={c["cart-product-removeAndLonely-icon"]} />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className={c["cart-product-bottom"]}>
                <div className={c["cart-product-bottom-button"]}>
                  Xaridlarni davom ettirish
                </div>
                <div className={c["cart-product-bottom-buy"]}>
                  <p>Jami {data.data.length} mahsulot: <strong>{allPrice} $</strong></p>
                  <div className={c["cart-product-bottom-buy-button"]}>Xaridni rasmiylashtirish</div>
                </div>
              </div>
            </div>
            : <div className={c["cart-notfound"]}>
              <BsCart3 className={c["cart-notfound-cart-icon"]} />
              <h3>Savatchada hozircha hechnima yoq</h3>
              <Link to="/" onClick={(() => setactiveCart(false))} className={c["cart-notfound-button"]}>Xarid qilish</Link>
            </div>
        }
      </div>
    </div>
  )
}