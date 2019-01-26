import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from 'ng-pick-datetime';
import { NativeDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/native-date-time-adapter.class';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from '../_services';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
//import { EventDetailComponent } from '../event/event-detail/event-detail.component';

export class FrenchIntl extends OwlDateTimeIntl {
  /** A label for the up second button (used by screen readers).  */
  upSecondLabel = 'ajouter une seconde';

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel = 'moins une seconde';

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel = 'ajouter une minute';

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel = 'moins une minute';

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel = 'ajouter une heure';

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel = 'moins une heure';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = 'le mois précédent';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = 'le mois prochain';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = 'année précédente';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel = 'l\'année prochaine';

  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel = 'Previous 21 years';

  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel = 'Next 21 years';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = 'Change to month view';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToMultiYearViewLabel = 'Choose month and year';

  /** A label for the cancel button */
  cancelBtnLabel = 'Cancelar';

  /** A label for the set button */
  setBtnLabel = 'Confirmar';

  /** A label for the range 'from' in picker info */
  rangeFromLabel = 'From';

  /** A label for the range 'to' in picker info */
  rangeToLabel = 'To';

  /** A label for the hour12 button (AM) */
  hour12AMLabel = 'AM';

  /** A label for the hour12 button (PM) */
  hour12PMLabel = 'PM';
}



@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventService,[
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'pt-br'},
    {provide: DateTimeAdapter, useClass: NativeDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE, Platform]},
    {provide: OwlDateTimeIntl, useClass: FrenchIntl},
  ]]
})
export class MyCalendarComponent implements OnInit {

  public events;
  public newEvent;
  public event: any = {};
  public dateTime: any;

  calendarOptions: Options;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventService) {
    this.dateTime = null;  

   }

  getEvents() {
    return this.eventService.get().then(events => {
      this.events = events;
    });
  }

  addEvent() {
    this.eventService.add(
      {
        id: this.event.id,
        title: this.event.title,
        start: this.event.start,
        end: this.event.end,
        status: this.event.status,
        color: this.event.color,
      }
    ).then(() => {
      return this.getEvents();
    }).then(() => {
      this.event = ''; // clear input form value
    });
  }

  updateEvent(/*event, newValue*/) {
    // event.id = newValue.id;
    // event.title = newValue.title;
    // event.title = newValue.start;
    // event.title = newValue.end;
    // event.title = newValue.status;
    // event.title = newValue.color;

    return this.eventService.put(this.event).then(() => {
      //event.editing = false;
      return this.getEvents();
    });
  }

  getEvent(id) {
    this.eventService.getEvent(id).then((event) => {
      this.event = event[0];
    });

  }

  timeValidator() {
    //valida se ja existe no array algum evento marcao neste horario

  }

  setColorState() {
    //define a cor do status do evento 
    switch (this.event.status) {
      case 'FREE':
        this.event.color = "blue";
        break;
      case 'BUSY':
        this.event.color = "red";
        break;
      case 'PROGRESS':
        this.event.color = "yellow";
        break;
      case 'DONE':
        this.event.color = "green";
        break;
      // default: 
      //     this.event.color = "blue";
    }

  }

  destroyEvent(id) {
    if (this.event.stats == 'PROGRESS' || this.event.stats == 'DONE') {
      alert('Este evento não pode ser excluido')
    }
    this.eventService.delete(id).then(() => {
      alert('Evento foi removido com sucesso!');
      return this.getEvents();
    });
  }

  ngOnInit() {
    this.getEvents();

    this.eventService.timeValidator({
      id: 1,
      title: 'Consulta1',
      start: '2039-01-01T01:00:00.000Z',
      end: '2030-01-01T02:12:12.000Z',
      status: 'free',
      color: '#c5eff7',
    }).then((result) => {
      if (result) {
        alert('evento ja existe na base de dados')
      }
      else {
        alert('evento nao exista na base de dados')
      }

    });

  }


  // setOptions(){
  //    //Set Calendar Options
  //    this.calendarOptions = {
  //     monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  //     monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  //     dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
  //     dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  //     allDayText: 'Eventos do dia',
  //     buttonText: {
  //         prev: "<",
  //         next: ">",
  //         prevYear: "<<",
  //         nextYear: ">>",
  //         today: "Hoje",
  //         month: "Mês",
  //         week: "Semana",
  //         day: "Dia",
  //     },
  //     editable: true,
  //     eventLimit: false,
  //     header: {
  //       left: 'prev,next  ',
  //       center: 'title',
  //       right: 'month,agendaWeek,agendaDay,listMonth'
  //     },
  //     events: this.events
  //   };

  // }

  // clickButton(model: any) {
  //   this.displayEvent = model;
  // }
  // eventClick(model: any) {


  //   model = {
  //     event: {
  //       id: model.event.id,
  //       start: model.event.start,
  //       end: model.event.end,
  //       title: model.event.title,
  //       allDay: model.event.allDay
  //       // other params
  //     },
  //     duration: {}
  //   }
  //   this.displayEvent = model;
  // }
  // updateEvent(model: any) {
  //   model = {
  //     event: {
  //       id: model.event.id,
  //       start: model.event.start,
  //       end: model.event.end,
  //       title: model.event.title
  //       // other params
  //     },
  //     duration: {
  //       _data: model.duration._data
  //     }
  //   }
  //   this.displayEvent = model;
  // }


}
