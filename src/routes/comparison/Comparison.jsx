import { Link } from 'react-router-dom';
import c from './Comparison.module.css';

export default function Comparison() {
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
        <div className={c["comparison-main-notfound"]}>
          <div className={c["comparison-main-notfound-main"]}>
            <img src="https://texnomart.uz/_nuxt/img/compare.f05c039.svg" alt="" />
            <h3>Biror narsani solishtiraylikmi?</h3>
            <p>Hususiyatlarni takkoslash uchun mahsulotlarni sizga eng mos keladigan tanlash</p>
            <Link className={c["comparison-main-notfound-btn"]} to="/">Katalogga o'tish</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
