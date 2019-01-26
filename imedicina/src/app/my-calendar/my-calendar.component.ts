import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from '../_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EventDetailComponent } from '../event/event-detail/event-detail.component';
import { EventFormComponent } from '../event/event-form/event-form.component';


@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
  providers: [EventService]
})
export class MyCalendarComponent implements OnInit {

  public user = {
    name: 'Izzat Nadiri',
    age: 26
  }

  public events;
  public newEvent;
  public event: any = {};
  public displayEvent :any = {}

  calendarOptions: Options;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventService,private modalService: NgbModal
    ) {}

    openFormModal() {
      const modalRef = this.modalService.open(EventDetailComponent);
      modalRef.componentInstance.user = this.user;
      modalRef.result.then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    }

    openDetailModal() {
      const modalRef = this.modalService.open(EventFormComponent);
      modalRef.componentInstance.user = this.user;
      modalRef.result.then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    }

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
        slotLabelFormat:"HH:mm",

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
          right: 'prev,next,today '
        },
        defaultView: 'agendaWeek',
        events: dataSource
      };
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
    
    this.getEvents()

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

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        status: model.event.status
        // other params
      },
      duration: {}
    }
    console.log(model); 
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
