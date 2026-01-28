import '../../scss/main.scss';
import './swiper.js';
import './customSwiper.js';
import './teamSwiper.js';
import './petSwiper.js';



console.log('Hello, VetCat!');

const checkbox = document.querySelectorAll('.sidebar__checkbox');

console.log(checkbox);
checkbox.forEach((box) => {
  box.addEventListener('change', (e) => {
    if (e.target.checked) {
      console.log('Чекбокс установлен (включен)');
    } else {
      console.log('Чекбокс снят (выключен)');
    }
  }); 
})
  