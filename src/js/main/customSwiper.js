import Swiper from 'swiper';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

export function initAboutSwiper() {
  const el = document.querySelector('.main-about-slider');
  const paginationLines = document.querySelectorAll('.main-about-pagination__line');

  if (!el || !paginationLines.length) return;

  function setActive(activeIndex) {
    paginationLines.forEach((line, index) => {
      line.classList.toggle('active', index === activeIndex);
      line
        .querySelector('.main-about-pagination__item')
        ?.classList.toggle('active', index === activeIndex);
    });
  }

  const swiper = new Swiper(el, {
    modules: [EffectFade],
    slidesPerView: 1,
    effect: 'fade',
    autoHeight: true,
    fadeEffect: { crossFade: true },

    on: {
      init(swiper) {
        setActive(swiper.activeIndex);
      },
      slideChange(swiper) {
        setActive(swiper.activeIndex);
      }
    }
  });

  paginationLines.forEach((line, index) => {
    line.addEventListener('click', () => {
      swiper.slideTo(index);
    });
  });
}

document.addEventListener('DOMContentLoaded', initAboutSwiper);
