import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initSertificatesSwiper() {
  const el = document.querySelector('.sertificates-swiper');
  if (!el) return; 

  const sertificatesSwiper = new Swiper(el, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    navigation: {
      nextEl: '.sertificates-next',
      prevEl: '.sertificates-prev',
    },

    breakpoints: {
      460: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      500: {
        slidesPerView: 1.6,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      1300: {
        slidesPerView: 2.6,
        spaceBetween: 20,
      },
      1800: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    }
  });

  document.querySelector('.sertificates-prev').addEventListener('click', () => sertificatesSwiper.slidePrev());
  document.querySelector('.sertificates-next').addEventListener('click', () => sertificatesSwiper.slideNext());
}

document.addEventListener('DOMContentLoaded', initSertificatesSwiper);
