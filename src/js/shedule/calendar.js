class ScheduleCalendar {
  constructor(rootElement, doctors) {
    this.root = rootElement;
    this.doctors = doctors;

    this.header = this.root.querySelector(".schedule__header");
    this.body = this.root.querySelector(".schedule__body");
    this.prevBtn = this.root.querySelector(".prev-week");
    this.nextBtn = this.root.querySelector(".next-week");

    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);

    this.currentDate = new Date(this.today);

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => {
      const newDate = new Date(this.currentDate);
      newDate.setDate(this.currentDate.getDate() - 1);

      if (newDate >= this.today) {
        this.animateChange("prev", newDate);
      }
    });

    this.nextBtn.addEventListener("click", () => {
      const newDate = new Date(this.currentDate);
      newDate.setDate(this.currentDate.getDate() + 1);
      this.animateChange("next", newDate);
    });
  }

  animateChange(direction, newDate) {
    const header = this.root.querySelector(".schedule__header");
    const width = header.offsetWidth;

    header.style.transform =
      direction === "next"
        ? `translateX(-${width}px)`
        : `translateX(${width}px)`;

    header.addEventListener(
      "transitionend",
      () => {
        this.currentDate = newDate;
        this.render();

        header.style.transition = "none";
        header.style.transform =
          direction === "next"
            ? `translateX(${width}px)`
            : `translateX(-${width}px)`;

        header.offsetHeight; 

        header.style.transition = "transform 0.25s ease";
        header.style.transform = "translateX(0)";
      },
      { once: true }
    );
  }

  getWeek(startDate) {
    const week = [];
    const date = new Date(startDate);

    for (let i = 0; i < 7; i++) {
      week.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return week;
  }

  formatKey(date) {
    return date.toISOString().split("T")[0];
  }

  isSameDate(d1, d2) {
    return d1.getTime() === d2.getTime();
  }

  render() {
    this.header.innerHTML = "";
    this.body.innerHTML = "";

    const week = this.getWeek(this.currentDate);

    if (this.isSameDate(this.currentDate, this.today)) {
      this.prevBtn.style.display = "none";
    } else {
      this.prevBtn.style.display = "inline-block";
    }

    const emptyCorner = document.createElement("div");
    emptyCorner.className = "schedule__doctor";
    this.header.appendChild(emptyCorner);

    week.forEach(date => {
      const day = document.createElement("div");
      day.className = "schedule__day";

      const normalized = new Date(date);
      normalized.setHours(0, 0, 0, 0);

      const dayIndex = normalized.getDay();

      if (dayIndex === 0 || dayIndex === 6) {
        day.classList.add("weekend");
      }

      let label;

      if (this.isSameDate(normalized, this.today)) {
        label = "Сегодня";
      } else {
        const tomorrow = new Date(this.today);
        tomorrow.setDate(this.today.getDate() + 1);

        if (this.isSameDate(normalized, tomorrow)) {
          label = "Завтра";
        } else {
          label = normalized.toLocaleDateString("ru-RU", {
            weekday: "short"
          });
        }
      }

      const dayNumber = normalized.getDate();
      const month = normalized.toLocaleDateString("ru-RU", {
        month: "short"
      });

      day.innerHTML = `
        ${label}
        <div class="schedule__day-wrap">
          <small>${dayNumber}&nbsp;</small>
          <span class="month">${month}</span>
        </div>
      `;

      this.header.appendChild(day);
    });

    this.doctors.forEach(doc => {
      const row = document.createElement("div");
      row.className = "schedule__row";

      const doctorCell = document.createElement("div");
      doctorCell.className = "schedule__doctor";
      doctorCell.innerHTML = `
        <div><strong>${doc.name}</strong></div>
        <div style="font-size:12px; color:#777; margin-top:7px; line-height:1.5">
          ${doc.spec}
        </div>
      `;

      row.appendChild(doctorCell);

      week.forEach(date => {
        const cell = document.createElement("div");
        cell.className = "schedule__cell";

        const key = this.formatKey(date);
        const time = doc.schedule[key];

        if (time) {
          cell.textContent = time;
        } else {
          cell.textContent = "—";
          cell.classList.add("empty");
        }

        row.appendChild(cell);
      });

      this.body.appendChild(row);
    });
  }
}

export default ScheduleCalendar;

// document.querySelectorAll("[data-calendar]").forEach(el => {
//   new ScheduleCalendar(el, doctors);
// });

