import '../../scss/pages/shedule/index.scss';
import '../dermatology/segment-buttons';
import ScheduleCalendar from './calendar';'./calendar';
import doctors from './data';

document.querySelectorAll("[data-calendar]").forEach(el => {
  new ScheduleCalendar(el, doctors);
});
