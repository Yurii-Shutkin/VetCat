import '../../scss/pages/employee/index.scss';
import '../reviews/modal'
import '../modals/postReview'
import '../modals/customSelect'
import '../modals/datePicker'
import './modal'
import '../modals/postAppointment'
import ScheduleCalendar from '../shedule/calendar';
import doctors from './data';

document.querySelectorAll("[data-calendar]").forEach(el => {
  new ScheduleCalendar(el, doctors);
});




