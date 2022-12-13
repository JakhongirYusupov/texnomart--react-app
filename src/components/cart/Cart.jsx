import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart3, BsTrash } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import c from './Cart.module.css';

export default function Cart({ setactiveCart }) {
  const dispatch = useDispatch();
  const data = useSelector(state => state);

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

  let allPrice = 0
  return (
    <div className={c["cart-modal"]}>
      <div className={c["cart-wrapper"]}>
        <div onClick={(() => setactiveCart(false))} className={c["cart-close-icon-wrapper"]} ><IoMdClose className={c["cart-close-icon"]} /></div>
        <div className={c["cart-title"]}>
          <h3>Hozir xarid qilish</h3>
        </div>
        {
          data.cart.data.length ?
            <div className={c["cart-products"]}>
              {
                data.cart.data.map(({ id, title, images, price, count }) => {
                  allPrice += price * count
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
                          <div onClick={(() => minusCount(id))}>-</div>
                          <div>{data.cart.data.find((e) => e.id === id).count}</div>
                          <div onClick={(() => pilusCount(id))}>+</div>
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
                  <p>Jami {data.cart.data.length} mahsulot: <strong>{allPrice} $</strong></p>
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
