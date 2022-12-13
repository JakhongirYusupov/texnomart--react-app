import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import c from './HeroBanner.module.css';
import { v4 as uuidv4 } from 'uuid';
import images from '../../data/hero-banner-data.json';
import mobileImages from '../../data/mobile-banner-images.json';
import { useEffect, useState } from "react";

export default function HeroBanner() {
  const [mediaSwiper, setmediaSwiper] = useState(window.innerWidth);
  const [mediaBannerImage, setmediaBannerImage] = useState(null);

  window.addEventListener("resize", () => {
    const { innerWidth } = window;
    setmediaSwiper(innerWidth)
    if (innerWidth > 768) setmediaBannerImage(images);
    else setmediaBannerImage(mobileImages)
  })

  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth > 768) setmediaBannerImage(images);
    else setmediaBannerImage(mobileImages)
  }, [])

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
          navigation={mediaSwiper > 768 ? true : false}
          modules={[Pagination, Navigation]}
          className={c.banner}
        >
          {
            mediaBannerImage?.map(e => {
              return <SwiperSlide key={uuidv4()} className={c["swiper-img"]}><img src={e} alt="img" /></SwiperSlide>
            })
          }

        </Swiper>
      </>
    </div>
  )
}