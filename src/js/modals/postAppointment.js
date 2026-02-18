async function postAppointment() {
    const modalForm = document.querySelector('.appointment-modal');
    const modalFormOverview = document.querySelector('.appointment-modal__overlay');
    const nameInput = document.getElementById('appointment-name');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('date');
    const petInput = document.getElementById('pet');
    const descInput = document.getElementById('appointment-review');

    
    const STRAPI_URL = 'https://usable-trust-8c353f5555.strapiapp.com';     

    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9+]/g, "");
    });

    const form = document.querySelector('.appointment-modal__form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
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
            const response = await fetch(STRAPI_URL + '/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: appointmentData }),
            });

            if (response.ok) {
                console.log('Отзыв успешно отправлен');
                form.reset();
                modalForm.style.display = 'none';
                modalFormOverview.style.display = 'none';
            } else {
                console.error('Ошибка при отправке отзыва:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', postAppointment);
