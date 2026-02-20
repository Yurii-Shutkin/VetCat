async function postReview() {
    const modalForm = document.querySelector('.review-modal');
    const modalFormOverview = document.querySelector('.review-modal__overlay');
    // const select = document.getElementById('doctor');
    const selectDropdown = document.querySelector('.select__dropdown');
    const nameInput = document.getElementById('name');
    const reviewInput = document.getElementById('review');
    const mailInput = document.getElementById('mail');
    const STRAPI_URL = 'https://usable-trust-8c353f5555.strapiapp.com/api/teams?populate=reviews';     

    let employeeId = null;

    try {
        const response = await fetch(STRAPI_URL);
        const { data } = await response.json(); 

        data.forEach(item => {
          const name = item.name;
          const id = item.id;
          const option = document.createElement('button');
          option.classList.add('select__option');
          const optionId = document.createElement('span');
          optionId.classList.add('select__option-id');
          
          option.setAttribute('type', 'button');
          option.innerHTML = name;
          optionId.innerHTML = id;
          employeeId = optionId.innerHTML;
          selectDropdown.appendChild(option);
          selectDropdown.appendChild(optionId);
    });

    } catch (error) {
        console.error('Ошибка загрузки специалистов:', error);
    }

    const form = document.querySelector('.review-modal__form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const reviewData = {
            name: nameInput.value,
            review: reviewInput.value,
            team: {id: Number(employeeId)},
            mail: mailInput.value,
            date: new Date().toISOString().split('T')[0],
        };

        try {
            const response = await fetch('https://usable-trust-8c353f5555.strapiapp.com/api/reviews?populate=team', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: reviewData }),
            });

            if (response.ok) {
                console.log('Отзыв успешно отправлен');
                console.log(reviewData.team);
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

document.addEventListener('DOMContentLoaded', postReview);
