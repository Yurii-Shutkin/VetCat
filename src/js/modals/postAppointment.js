import JustValidate from 'just-validate';

const body = document.querySelector('body');
const modalForm = document.querySelector('.appointment-modal');
const modalFormOverview = document.querySelector('.appointment-modal__overlay');
const nameInput = document.getElementById('appointment-name');
const phoneInput = document.getElementById('phone');
const dateInput = document.getElementById('date');
const petInput = document.getElementById('pet');
const descInput = document.getElementById('appointment-review');

const STRAPI_SERVER_URL = 'https://usable-trust-8c353f5555.strapiapp.com';     

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9+]/g, "")
});

const validator = new JustValidate('.appointment-modal__form');

validator
.addField(
  '#appointment-name', [
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
      errorMessage: 'Имя не должно превышать больше, 15 символов',
    },
  ]
)
.addField(
  '#date', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению',
    },
  ]
)
.addField(
  '#pet', [
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
  ]
)
.addField(
  '#phone', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению',
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Номер телефона должен содержать как минимуи 10 цифр',
    },
    {
      rule: 'maxLength',
      value: 13,
      errorMessage: 'Номер телефона не может превышать значение 13 цифр',
    },
  ]
)
.addField(
  '#pet', [
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
  ]
)
.addField('#appointment-checkbox', [
    {
      rule: 'required',
      errorMessage: 'Необходимо согласие',
    },
  ]
)
.onSuccess(async (event) => {
    event.preventDefault(); 
    
    const selectedRadio = document.querySelector('input[name="affiliate"]:checked');

        const appointmentData = {
            name: nameInput.value,
            phone: phoneInput.value,
            affiliate: selectedRadio ? selectedRadio.value : null,
            date: dateInput.value,
            pet: petInput.value,
            desc: descInput.value,
        };

        try {
            const response = await fetch(STRAPI_SERVER_URL + '/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: appointmentData }),
            });

            if (response.ok) {
                console.log('Запись успешно создана');
                event.target.reset();
                modalForm.style.display = 'none';
                modalFormOverview.style.display = 'none';
                body.style.overflow = 'auto';
            } else {
                console.error('Ошибка при отправке формы:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
  });
