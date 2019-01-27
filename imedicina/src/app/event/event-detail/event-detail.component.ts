import { Component, Input, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent 
{

  @Input() public event;

  constructor(public activeModal: NgbActiveModal) { }
  
  ngOnInit() {
  }
}
