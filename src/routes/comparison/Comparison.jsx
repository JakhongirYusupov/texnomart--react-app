import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import c from './Comparison.module.css';
import { v4 as uuidv4 } from 'uuid';
import { BsCart3, BsCartCheck } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

export default function Comparison({ setactiveCart }) {
  const dispatch = useDispatch();
  const { comparison: { data } } = useSelector(state => state);
  const { cart } = useSelector(state => state)

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
    <div>
      <div className={c["comparison-top"]}>
        <div className="container">
          <div className={c["comparison-title"]}>
            <h1>Maxsulotlarni taqqoslash</h1>
          </div>
          <div className={c["comparison-top-types"]}>
            <p>Faqat farqlar</p>
          </div>
        </div>
      </div>
      <div className="container">
        {
          data?.length ?
            <div className={c["comparison-main"]}>
              <div className={c["comparison-product-render"]}>
                {
                  data?.map(({ id, images, title, price }) => {
                    return (
                      <div key={uuidv4()} className={c["product-item"]}>
                        <div onClick={(() => dispatchToCompare({ id }))} className={c["cart-close-icon-wrapper"]} >
                          <IoMdClose className={c["cart-close-icon"]} />
                        </div>
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
                          cart.data.find((e) => e.id === id) ?
                            <div className={c["product-addedCart-wrapper"]}>
                              <div className={c["product-addedCart-icon"]} onClick={(() => setactiveCart(true))} >
                                <BsCartCheck className={c["product-item-cart-icon"]} />
                              </div>
                              <div className={c["product-addedCart-count"]}>
                                <div onClick={(() => minusCount(id))}>-</div>
                                <div>{cart.data.find((e) => e.id === id).count}</div>
                                <div onClick={(() => pilusCount(id))}>+</div>
                              </div>
                            </div>
                            :
                            <div className={c["product-item-cart-wrapper"]}>
                              <div className={c["product-item-cart"]} onClick={(() => dispatchProduct({ id, title, price, images, count: 1 }))}>
                                <BsCart3 className={c["product-item-cart-icon"]} />
                                <p>Savatchaga</p>
                              </div>
                            </div>
                        }

                      </div>
                    )
                  })
                }
              </div>
              <div className={c["comparison-main-details-wrapper"]}>
                {
                  data?.map(({ id, title, price, description, category: { name } }) => {
                    return (
                      <div key={id} className={c["comparison-main-details"]}>
                        <div>
                          <p><span>Product id</span></p>
                          <span>{id}</span>
                        </div>
                        <div>
                          <p><span>Product name</span></p>
                          <span>{title}</span>
                        </div>
                        <div>
                          <p><span>Price</span></p>
                          <span>{price} $</span>
                        </div>
                        <div>
                          <p><span>Desctiption</span></p>
                          <span>{description}</span>
                        </div>
                        <div>
                          <p><span>Category name</span></p>
                          <span>{name}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            : <div className={c["comparison-main-notfound"]}>
              <div className={c["comparison-main-notfound-main"]}>
                <img src="https://texnomart.uz/_nuxt/img/compare.f05c039.svg" alt="" />
                <h3>Biror narsani solishtiraylikmi?</h3>
                <p>Hususiyatlarni takkoslash uchun mahsulotlarni sizga eng mos keladigan tanlash</p>
                <Link className={c["comparison-main-notfound-btn"]} to="/">Katalogga o'tish</Link>
              </div>
            </div>
        }
      </div>
    </div>
  )
}
