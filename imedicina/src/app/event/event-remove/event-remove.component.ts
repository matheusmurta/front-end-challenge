import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../_services';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-remove',
  templateUrl: './event-remove.component.html',
  styleUrls: ['./event-remove.component.scss'],
  providers: [EventService]

})
export class EventRemoveComponent implements OnInit {

  @Input() public id;

  constructor(public activeModal: NgbActiveModal, protected eventService: EventService) { }
  delete() {
    this.eventService.delete(this.id).then(() => {
      alert('Evento foi removido com sucesso!');
    });

    this.activeModal.close("Submit");
  }

  cancel(){
    this.activeModal.dismiss("cancel");

  }
  ngOnInit() {
  }

}
