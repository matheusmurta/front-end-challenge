import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from 'ng-pick-datetime';
import { NativeDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/native-date-time-adapter.class';
import { EventService } from '../../_services';


export class BrazilIntl extends OwlDateTimeIntl {


  //TODO Traduzir aqui tudo que voce precisar


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
  stat = [
    { value: "FREE", color: "blue" },
    { value: "BUSY", color: "red" },
    { value: "PROGRESS", color: "yellow" },
    { value: "DONE", color: "green" }
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

    // this.eventService.getEvent(this.event.id).then((event) => {
    //   let eventState = event[0];
    //   console.log(eventState)

    //   if(eventState == 'undefined'){
    //     alert ('novo')
    //   }
    //   else{
    //     alert('editando')
    //   }
    // });

    // console.log(this.event)

    // if(this.event == 'undefined'){
    //   alert('ele nao existe na base, ele esta criando um novo')
    // }
    // else{
    //   alert('ele existe na base, ele esta editando')
    // }

    // this.eventService.getEvent(this.event.id).then((event) => {
    //   let eventState = event[0];

    //   if(eventState == 'undefined'){
    //     alert ('novo')
    //   }
    //   else{
    //     alert('editando')
    //   }
    // });


    // if (this.event.id == 'undefined' || (this.event.id == null)) {
    //   alert('opa evento novo')
    // }
    // else {
    //   alert('editando evento')
    //   // return this.eventService.put(this.event).then(() => {
    //   //   return console.log('ok');
    //   //   //event.editing = false;
    //   // }).then(() => {
    //   //   //Limpar valor do form 
    //   //   this.event = '';
    //   // });
    // }

    //teste
    this.eventService.get().then(dataSource => {
     console.log(dataSource)
    });

    this.activeModal.close("Submit");

  }

  close() {
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

    //Fecha Modal
    this.activeModal.dismiss('ok');
  }

  ngOnInit() {
    console.log(this.event.id)
    if (typeof this.event.id !== 'undefined'){
       this.formMode = 'edit';
    }
    else{
      this.formMode = 'new';
    }
  }
}
