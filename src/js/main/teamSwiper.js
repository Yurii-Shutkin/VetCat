import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initTeamSwiper() {
  const el = document.querySelector('.team-swiper');
  if (!el) return; 

  const teamSwiper = new Swiper(el, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    navigation: {
      nextEl: '.team-next',
      prevEl: '.team-prev',
    },

    watchOverflow: false,

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
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      1800: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    }
  });

  document.querySelector('.team-prev').addEventListener('click', () => teamSwiper.slidePrev());
  document.querySelector('.team-next').addEventListener('click', () => teamSwiper.slideNext());
}

document.addEventListener('DOMContentLoaded', initTeamSwiper);
