import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


const swiperThumbs = new Swiper('.thumbs-swiper', {
  modules: [Thumbs],
  spaceBetween: 16,
  slidesPerView: 10,
  freeMode: true,
  watchSlidesProgress: true, 
});


const swiperMain = new Swiper('.main-swiper', {
  modules: [Navigation, Thumbs],
  spaceBetween: 10,
  navigation: {
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  },
  thumbs: {
    swiper: swiperThumbs, 
  },
});
