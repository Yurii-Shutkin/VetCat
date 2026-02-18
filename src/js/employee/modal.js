const body = document.querySelector('body');

const modalForm = document.querySelector('.appointment-modal');
const modalFormOverview = document.querySelector('.appointment-modal__overlay');
const modalFormTriggerBtn = document.querySelector('.employee__shedule-btn');
const modalFormCloseBtn = document.querySelector('.appointment-modal__close');

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
