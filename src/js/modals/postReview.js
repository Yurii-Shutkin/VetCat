import JustValidate from 'just-validate';

const body = document.querySelector('body');
const modalForm = document.querySelector('.review-modal');
const modalFormOverview = document.querySelector('.review-modal__overlay');
const selectDropdown = document.querySelector('.select__dropdown');
const nameInput = document.getElementById('name');
const reviewInput = document.getElementById('review');
const mailInput = document.getElementById('mail');
const STRAPI_SERVER_URL = 'https://usable-trust-8c353f5555.strapiapp.com';   
const hiddenInput = document.getElementById('employee');
const selectValue = document.querySelector('.select__value');

try {
  const response = await fetch(`${STRAPI_SERVER_URL}/api/teams?populate=reviews`);
  const { data } = await response.json(); 

  data.forEach(item => {
    const name = item.name;
    const id = item.id;

    const option = document.createElement('button');
    option.classList.add('select__option');
    option.type = "button";
    option.textContent = name;

    const optionId = document.createElement('span');
    optionId.classList.add('select__option-id');

    option.addEventListener('click', () => {
      selectValue.textContent = name;
      hiddenInput.value = id;
    })

    selectDropdown.appendChild(option);
  });

} catch (error) {
  console.error('Ошибка загрузки специалистов:', error);
}

const validator = new JustValidate('.review-modal__form');

validator
.addField('#employee', [
  {
    rule: 'required',
    errorMessage: 'Выберите специалиста',
  },
])
.addField('#review', [
  {
    rule: 'required',
    errorMessage: 'Поле обязательно к заполнению',
  },
])
.addField('#name', [
  {
    rule: 'required',
    errorMessage: 'Поле обязательно к заполнению',
  },
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Имя должно содержать как минимуи 2 символа',
  },
  {
    rule: 'maxLength',
    value: 15,
    errorMessage: 'Имя не должно превышать больше, чем 15 символов',
  },
])
.addField('#mail', [
  {
    rule: 'required',
    errorMessage: 'Введите email',
  },
  {
    rule: 'email',
    errorMessage: 'Введите корректный email',
  },
])
.addField('#review-checkbox', [
  {
    rule: 'required',
    errorMessage: 'Необходимо согласие',
  },
])
.onSuccess(async (event) => {
  event.preventDefault();
  const reviewData = {
      name: nameInput.value,
      review: reviewInput.value,
      team: {id: Number(hiddenInput.value)},
      mail: mailInput.value,
      date: new Date().toISOString().split('T')[0],
  };

  try {
      const response = await fetch(`${STRAPI_SERVER_URL}/api/reviews?populate=team`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: reviewData }),
      });

      if (response.ok) {
          console.log('Отзыв успешно отправлен');
          console.log(reviewData.team);
          event.target.reset();
          modalForm.style.display = 'none';
          modalFormOverview.style.display = 'none';
          body.style.overflow = 'auto';
      } else {
          console.error('Ошибка при отправке отзыва:', response.statusText);
      }
  } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
  }
})
