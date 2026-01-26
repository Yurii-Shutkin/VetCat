export const initSubLinks = () => {
    const linkWraps = document.querySelectorAll('.sidebar__link-wrap');
}

export const addedActiveClass = (element) => {
  Array.isArray(element) ?
    element.forEach((el) => el.classList.add('active')) :
    element.classList.add('active');
}

