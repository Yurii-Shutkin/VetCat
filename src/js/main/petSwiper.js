import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initPetSwiper() {
  const el = document.querySelector('.stories-swiper');
  if (!el) return; 

  const petSwiper = new Swiper(el, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    navigation: {
      nextEl: '.stories-next',
      prevEl: '.stories-prev',
    },

    breakpoints: {
      460: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      500: {
        slidesPerView: 1.8,
        spaceBetween: 20,
      },
      630: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.4,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 2.8,
        spaceBetween: 20,
      },
      1640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1800: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    }
  });

  document.querySelector('.stories-prev').addEventListener('click', () => petSwiper.slidePrev());
  document.querySelector('.stories-next').addEventListener('click', () => petSwiper.slideNext());
}

document.addEventListener('DOMContentLoaded', initPetSwiper);
