const body = document.querySelector('body');
const reviews = document.querySelectorAll('.review');
const triggerButtons = document.querySelectorAll('.review__expand-btn');
const modal = document.querySelector('.reviews__modal');
const modalOverview = document.querySelector('.reviews__modal-overlay');
const modalCloseBtn = document.querySelector('.reviews__modal-close')

const modalForm = document.querySelector('.review-modal');
const modalFormOverview = document.querySelector('.review-modal__overlay');
const modalFormTriggerBtn = document.querySelector('.review-button');
const modalFormCloseBtn = document.querySelector('.review-modal__close');


reviews.forEach(review  => {
  const h5 = review.querySelector('.review__name');
  const p = review.querySelector('.review__inner');
  const modalH = modal.querySelector('.reviews__modal-name');
  const modalP = modal.querySelector('.reviews__modal-inner');
  console.log(body)
  review.addEventListener('click', (e) => {

    if (e.target.tagName === 'BUTTON') { 
      body.style.overflow = 'hidden'   
      modal.style.display = 'block';
      modalOverview.style.display = 'block';
      modalH.innerHTML = `
        <h5> ${h5.textContent} </h5>
      `;
      modalP.innerHTML= `
        <p> ${p.textContent} </p>
      `;
    } else {
      return
    }
  })
})

modalCloseBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalOverview.style.display = 'none';
  body.style.overflow = 'auto'   
})

modalOverview.addEventListener('click', () => {
  modal.style.display = 'none';
  modalOverview.style.display = 'none';
  body.style.overflow = 'auto'   
})

modalFormTriggerBtn ? modalFormTriggerBtn.addEventListener('click', () => {
  body.style.overflow = 'hidden'   
  modalForm.style.display = 'block';
  modalFormOverview.style.display = 'block';
}) : null;

modalFormCloseBtn ? modalFormCloseBtn.addEventListener('click', () => {
  modalForm.style.display = 'none';
  modalFormOverview.style.display = 'none';
  body.style.overflow = 'auto'   
}) : null;

modalFormOverview ? modalFormOverview.addEventListener('click', () => {
  modalForm.style.display = 'none';
  modalFormOverview.style.display = 'none';
  body.style.overflow = 'auto'   
}) : null; 
