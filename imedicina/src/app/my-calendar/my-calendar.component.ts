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

   calendarOptions: Options;

   @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
   constructor(protected eventService: EventService) { }

   getEvents(){
    return this.eventService.get().then(events => {
      this.events = events;
      console.log(events)
    });
  }

  addEvent() {
    this.eventService.add(
      { 
        id: this.newEvent.id, 
        title: this.newEvent.title, 
        start: this.newEvent.start, 
        end: this.newEvent.end, 
        status: this.newEvent.status, 
        color: this.newEvent.color, 
       }
      ).then(() => {
      return this.getEvents();
    }).then(() => {
      this.newEvent = ''; // clear input form value
    });
  }

  updateEvent(event, newValue) {
    event.id = newValue.id;
    event.title = newValue.title;
    event.title = newValue.start;
    event.title = newValue.end;
    event.title = newValue.status;
    event.title = newValue.color;

    return this.eventService.put(event).then(() => {
      event.editing = false;
      return this.getEvents();
    });
  }

  getEvent(id){
    this.eventService.getEvent(id);
  }

  destroyEvent(id) {
    this.eventService.delete(id).then(() => {
      return this.getEvents();
    });
  }

  ngOnInit() {
      this.getEvents();
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
