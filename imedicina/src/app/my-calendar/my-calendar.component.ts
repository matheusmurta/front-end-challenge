import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from '../_services';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
//import { EventDetailComponent } from '../event/event-detail/event-detail.component';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
  providers: [EventService]
})
export class MyCalendarComponent implements OnInit {

  public events;
  public newEvent;
  public event: any = {};

  calendarOptions: Options;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventService) { }

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
