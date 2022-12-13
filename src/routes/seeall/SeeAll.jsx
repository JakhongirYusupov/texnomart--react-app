import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BsCart3, BsCartCheck } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { GiScales } from 'react-icons/gi';
import c from '../../components/products/Products.module.css';
import d from './SeeAll.module.css';
import { useDispatch, useSelector } from 'react-redux';


export default function SeeAll({ setactiveCart }) {
  const { categoryId } = useParams();
  const [data, setData] = useState(null);
  const dataCart = useSelector(state => state);
  const dispatch = useDispatch();
  const { comparison } = useSelector(state => state);

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
      .then((res) => setData(res.data))
      .catch()
  }, [categoryId])

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
      <div className="container">
        <div className={d["seeAll"]}>
          {
            data ?
              data.map(({ id, images, title, price, description, category }) => {
                return (
                  <div key={uuidv4()} className={c["product-item"]}>
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
                  </div>
                )
              })
              : null
          }
        </div>
      </div>
    </div>
  )
}
