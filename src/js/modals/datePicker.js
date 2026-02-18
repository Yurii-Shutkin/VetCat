const calendarWrapper = document.querySelector(".appointment-modal__calendar-wrapper");
const dateInput = document.getElementById("date");

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

let currentDate = new Date();
let selectedDay = null;

const monthTitle = document.getElementById("monthTitle");
const daysGrid = document.getElementById("daysGrid");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDay(year, month) {
  let day = new Date(year, month, 1).getDay() - 1;
  if (day < 0) day = 6;
  return day;
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthTitle.textContent = `${monthNames[month]} ${year}`;
  daysGrid.innerHTML = "";

  const startDay = getStartDay(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  const prevMonthDays = getDaysInMonth(year, month - 1);

  for (let i = 0; i < 42; i++) {
    const cell = document.createElement("div");
    cell.classList.add("day");

    if (i < startDay) {
      cell.textContent = prevMonthDays - (startDay - 1 - i);
      cell.classList.add("inactive");
    }

    else if (i >= startDay && i < startDay + daysInMonth) {
      const dayNumber = i - startDay + 1;
      cell.textContent = dayNumber;

      if (
        selectedDay &&
        selectedDay.year === year &&
        selectedDay.month === month &&
        selectedDay.day === dayNumber
      ) {
        cell.classList.add("selected");
      }

      cell.addEventListener("click", () => {
        selectedDay = { year, month, day: dayNumber };
        const formattedDay = String(dayNumber).padStart(2, "0");
        const formattedMonth = String(month + 1).padStart(2, "0");
        dateInput.value = `${year}-${formattedMonth}-${formattedDay}`;

        calendarWrapper.classList.remove("active");
        renderCalendar();
      });

    }

    else {
      cell.textContent = i - (startDay + daysInMonth) + 1;
      cell.classList.add("inactive");
    }

    daysGrid.appendChild(cell);
  }
}


prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

selectedDay = {
  year: currentDate.getFullYear(),
  month: currentDate.getMonth(),
  day: currentDate.getDate()
};

dateInput.addEventListener("click", () => {
  calendarWrapper.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!calendarWrapper.contains(e.target) && e.target !== dateInput) {
    calendarWrapper.classList.remove("active");
  }
});

renderCalendar();
