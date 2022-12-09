import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import c from './HeroBanner.module.css';
import { v4 as uuidv4 } from 'uuid';
import images from '../../data/hero-banner-data.json';

export default function HeroBanner() {
  return (
    <div className={c["hero-banner"]}>
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={images.length}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className={c.banner}
        >
          {
            images.map(e => {
              return <SwiperSlide key={uuidv4()} className={c["swiper-img"]}><img src={e} alt="img" /></SwiperSlide>
            })
          }

        </Swiper>
      </>
    </div>
  )
}