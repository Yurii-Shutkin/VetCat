document.addEventListener("DOMContentLoaded", () => {
  const selectControl = document.querySelector(".select__control");
  const selectArrow = document.querySelector(".select__arrow");
  const selectValue = document.querySelector(".select__value");
  const selectDropdown = document.querySelector(".select__dropdown");

  let selectedItem = null;

  selectControl.addEventListener("click", () => {
    selectDropdown.classList.toggle("select__dropdown-active");
    selectArrow.classList.toggle("select__arrow-active");
  });

  selectDropdown.addEventListener("click", (e) => {
    const option = e.target.closest(".select__option");
    if (!option) return;

    const activeItem = selectDropdown.querySelector(".select__option-active");
    if (activeItem) {
      activeItem.classList.remove("select__option-active");
    }

    option.classList.add("select__option-active");
    selectDropdown.classList.remove("select__dropdown-active");
    selectArrow.classList.remove("select__arrow-active");

    selectValue.textContent = option.textContent;

    selectedItem = option.textContent;
    console.log("Selected:", selectedItem);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".select")) {
      selectDropdown.classList.remove("select__dropdown-active");
    }
  });
});
