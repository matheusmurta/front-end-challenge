import { Component, Output, EventEmitter, Input, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent 
{

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
