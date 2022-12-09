import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BsCart3 } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { GiScales } from 'react-icons/gi';
import c from '../../components/products/Products.module.css';
import d from './SeeAll.module.css';


export default function SeeAll() {
  const { categoryId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error))
  }, [categoryId])
  return (
    <div>
      <div className="container">
        <div className={d["seeAll"]}>
          {
            data ?
              data.map(({ id, images, title, price }) => {
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
                    <div className={c["product-item-cart-wrapper"]}>
                      <div className={c["product-item-cart"]}>
                        <BsCart3 className={c["product-item-cart-icon"]} />
                        <p>Savatchaga</p>
                      </div>
                      <div>
                        <AiOutlineHeart className={c["product-item-cart-icons"]} />
                      </div>
                      <div>
                        <GiScales className={c["product-item-cart-icons"]} />
                      </div>
                    </div>
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
