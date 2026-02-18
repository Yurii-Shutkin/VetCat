async function postReview() {
    const modalForm = document.querySelector('.review-modal');
    const modalFormOverview = document.querySelector('.review-modal__overlay');
    const select = document.getElementById('doctor');
    const nameInput = document.getElementById('name');
    const reviewInput = document.getElementById('review');
    const mailInput = document.getElementById('mail');
    const STRAPI_URL = 'https://usable-trust-8c353f5555.strapiapp.com/api/teams?populate=reviews';     

    try {
        const response = await fetch(STRAPI_URL);
        const { data } = await response.json(); 

        select.innerHTML = '';
        data.forEach(item => {
          const name = item.name;
          const id = item.id;
          const option = document.createElement('option');
          option.value = id;
          option.textContent = name;
          select.appendChild(option);
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
            team: {id: Number(select.value)},
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
