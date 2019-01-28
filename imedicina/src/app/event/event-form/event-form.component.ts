import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from 'ng-pick-datetime';
import { NativeDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/native-date-time-adapter.class';
import { EventService } from '../../_services';


export class BrazilIntl extends OwlDateTimeIntl {

  /** A label for the cancel button */
  cancelBtnLabel = 'Cancelar';

  /** A label for the set button */
  setBtnLabel = 'Confirmar';
}

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    EventService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pt-br' },
    { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE, Platform] },
    { provide: OwlDateTimeIntl, useClass: BrazilIntl },
  ],
})
export class EventFormComponent {

  @Input() public event: any = {};
  selected: any;
  filtered: any;
  formMode: string;
  formValid: boolean;
  stat = [
    { value: "FREE", color: "#6bb9f0" },
    { value: "BUSY", color: "#e74c3c" },
    { value: "PROGRESS", color: "#fef160" },
    { value: "DONE", color: "#3fc380" }
  ];

  status = ['FREE', 'BUSY', 'PROGRESS', 'DONE'];

  constructor(public activeModal: NgbActiveModal, protected eventService: EventService) {
    this.event = {
      id: null,
      title: null,
      start: null,
      end: null,
      status: null,
      color: null
    }
  }

  onOptionsSelected() {
    this.filtered = this.stat.filter(t => t.value == this.event.status);
    this.event.status = this.filtered[0].value;
    this.event.color = this.filtered[0].color;
    this.event.id = Math.floor((Math.random() * 300) + 1);
  }

  save() {

    //Validar Horario Igual
    let start = this.event.start.getHours() + ":" + this.event.start.getMinutes();
    let end = this.event.end.getHours() + ":" + this.event.end.getMinutes();

    if (start == end) {
      alert('Atenção os não podem ser iguais')
    }

    //Verifica se ja existe este horario no array de eventos 
    this.eventService.timeValidator(this.event).then((result) => {
      if (result) {
        alert('evento com este horario ja existe na base de dados')
      }
      else {
        alert('evento nao exista na base de dados')
      }
    });

    if(this.formMode == 'new'){
      this.eventService.add(this.event).then(() => {
       return console.log('ok');
    }).then(() => {
       //Limpar valor do form 
       this.event = '';
     });

    }
    else {
      this.eventService.put(this.event).then(() => {
            return console.log('ok');
            //event.editing = false;
          }).then(() => {
            //Limpar valor do form 
            this.event = '';
          });
    }

    this.activeModal.close("Submit");

  }

  cancel(){
    this.activeModal.dismiss("cancel");
  }

  ngOnInit() {
    if (typeof this.event.id !== 'undefined'){
       this.formMode = 'edit';
    }
    else{
      this.formMode = 'new';
    }
  }
}
