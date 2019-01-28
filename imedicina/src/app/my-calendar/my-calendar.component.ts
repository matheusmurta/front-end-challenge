import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from '../_services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { EventDetailComponent } from '../event/event-detail/event-detail.component';
import { EventFormComponent } from '../event/event-form/event-form.component';


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
  public displayEvent: any = {}

  calendarOptions: Options;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventService, private modalService: NgbModal
  ) { }

  getEvents() {
    this.eventService.get().then(dataSource => {
      this.events = dataSource
      this.calendarOptions = {
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        allDayText: 'Eventos do dia',
        allDaySlot: false,
        slotLabelFormat: "HH:mm",
        //timezone: 'local',
        // axisFormat: 'HH:mm',
        buttonText: {
          prev: "<",
          next: ">",
          prevYear: "<<",
          nextYear: ">>",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        },
        editable: true,
        eventLimit: false,
        header: {
          left: 'agendaWeek,agendaDay',
          center: 'title',
          right: 'today,prev,next'
        },
        defaultView: 'agendaWeek',
        views : {
          agendaWeek : {
             columnFormat : "ddd DD/MM"
          }
       },
        events: dataSource
      };
    });
  }

  ngOnInit() {
    this.getEvents()
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: new Date(Date.parse(model.event.start)),
        end: new Date(Date.parse(model.event.end)),
        title: model.event.title,
        status: model.event.status,
        color: model.event.color
      }
    }
    const modalRef = this.modalService.open(EventDetailComponent);
    modalRef.componentInstance.event = model;

    modalRef.result.then((result) => {
      `Closed with: ${result}`;
    }, (reason) => {
      `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  newtest() {
    const modalRef = this.modalService.open(EventFormComponent);
    modalRef.componentInstance.event = {};

    modalRef.result.then((result) => {
      `Closed with: ${result}`;
      this.ucCalendar.fullCalendar('removeEvents');
      
      this.eventService.get().then(dataSource => {
        this.events = dataSource
      });

      this.ucCalendar.fullCalendar('addEventSource', this.events );
      this.ucCalendar.fullCalendar('refetchEvents');
      this.ucCalendar.fullCalendar('rerenderEvents');
     ;

    }, (reason) => {
      `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateEvent2(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }


}
