import { Component, Output, EventEmitter, Input, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {

  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.user);
  }

  passBack() {
    alert('pass back')
    console.log(this.user)
    this.passEntry.emit(this.user);
  }

}
