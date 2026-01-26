import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initSwiper() {
  const el = document.querySelector('.main-page-swiper');
  if (!el) return; 

  const servicesSwiper = new Swiper(el, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
      1200: {
        slidesPerView: 2.6,
        spaceBetween: 20,
      },
      1800: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    }
  });

  document.querySelector('.swiper-custom-prev-arrow').addEventListener('click', () => servicesSwiper.slidePrev());
  document.querySelector('.swiper-custom-next-arrow').addEventListener('click', () => servicesSwiper.slideNext());
}

document.addEventListener('DOMContentLoaded', initSwiper);
