import '../../scss/pages/employee/index.scss';
import '../reviews/modal'
import '../modals/postReview'
import '../modals/customSelect'
import '../modals/postAppointment'
import '../modals/datePicker'
import './modal'
import ScheduleCalendar from '../shedule/calendar';'../shedule/calendar';
import doctors from './data';

document.querySelectorAll("[data-calendar]").forEach(el => {
  new ScheduleCalendar(el, doctors);
});




