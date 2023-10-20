import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { localRoomServices } from 'services';
import { localRoomListType } from 'types';

type SwiperCarouselProps = {
  data: localRoomListType[];
};

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        await localRoomServices.getLocalRoomList();
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className={`swiper-carousel ${isLoading ? 'loading' : ''}`}>
      {isLoading ? (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper"
        >
          {data.map((local) => (
            <SwiperSlide key={local.id}>
              <img src={local.hinhAnh} alt="Banner" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default SwiperCarousel;
