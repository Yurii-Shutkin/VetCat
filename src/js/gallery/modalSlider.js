const body = document.querySelector('body');
const galleryCards = document.querySelectorAll('.gallery-card');
const sliderModal = document.querySelector('.modal-slider');
const sliderCloseBtn = document.querySelector('.modal-slider-overview');
const modalSliderOverview = document.querySelector('.modal-slider-overview');

galleryCards.forEach(card => {
  card.addEventListener('click', () => {
    sliderModal.style.display = 'block';
    modalSliderOverview.style.display = 'block';
    body.style.overflow = 'hidden';
  })
})

sliderCloseBtn.addEventListener('click', () => {
  sliderModal.style.display = 'none';
  modalSliderOverview.style.display = 'none';
  body.style.overflow = 'auto';
})

// modalSliderOverview.addEventListener('click', (e) => {
//   // e.target.stopPropagation();
//   sliderModal.style.display = 'none';
//   modalSliderOverview.style.display = 'none';
//   body.style.overflow = 'auto';
// })
